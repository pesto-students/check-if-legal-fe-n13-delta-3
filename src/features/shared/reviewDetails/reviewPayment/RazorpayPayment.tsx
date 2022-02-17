import { Box, Button } from "@chakra-ui/react"
import { FC, useCallback, useState } from "react"
import useRazorpay from "react-razorpay"
import { formatInr, getErrorMessage } from "../../../../utils/helpers"
import { useUserAuth } from "../../../user/useUserAuth"
import { ErrorText } from "../../components/ui/ErrorText"
import { useReviewDetailsStore } from "../useReviewDetailsStore"
import { reviewPaymentIntentGetApi } from "./reviewPaymentIntentGetApi"
import { useReviewPaymentStore } from "./useReviewPaymentStore"

export const RazorpayPayment: FC = () => {
	const { review, fetchReview } = useReviewDetailsStore()
	const { fetchPayment } = useReviewPaymentStore()
	const { token } = useUserAuth()
	const Razorpay = useRazorpay()
	const [errorText, setErrorText] = useState<string>()

	const handlePaymentRequest = useCallback(async () => {
		if (!review) return

		try {
			const { orderId, idKey, amount, currency, name, description } =
				await reviewPaymentIntentGetApi({
					reviewId: review.id,
					token,
				})

			const razorpayInstance = new Razorpay({
				key: idKey,
				order_id: orderId,
				amount: amount.toString(),
				currency,
				name,
				description,
				handler: () => {
					fetchPayment({ reviewId: review.id, token }, () => {
						fetchReview({ id: review.id, token })
					})
				},
			})
			razorpayInstance.open()
		} catch (err) {
			setErrorText(getErrorMessage(err))
		}
	}, [review, token, Razorpay, fetchPayment, fetchReview])

	if (!review) return null

	return (
		<Box>
			{errorText && <ErrorText text={errorText} />}
			<Button size={"sm"} mt={1} colorScheme="blue" onClick={handlePaymentRequest}>
				Pay {formatInr(review.price)} INR to Continue
			</Button>
		</Box>
	)
}
