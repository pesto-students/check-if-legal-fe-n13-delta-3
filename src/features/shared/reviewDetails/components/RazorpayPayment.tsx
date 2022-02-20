import { Box, Button } from "@chakra-ui/react"
import { ComponentProps, FC, useCallback } from "react"
import useRazorpay from "react-razorpay"
import { formatInr, getErrorMessage } from "../../../../utils/helpers"
import { useUserAuth } from "../../../user/useUserAuth"
import { useErrorToast } from "../../hooks/useErrorToast"
import { useSuccessToast } from "../../hooks/useSuccessToast"
import { useReviewDetailsData } from "../queries/reviewDetails.query"
import { apiReviewPaymentIntentGet } from "../apis/apiReviewPaymentIntentGet"

interface IProps extends ComponentProps<typeof Box> {
	reviewId: number
}

export const RazorpayPayment: FC<IProps> = ({ reviewId }) => {
	const { token } = useUserAuth()
	const successToast = useSuccessToast()
	const errorToast = useErrorToast()

	const { data, refetch } = useReviewDetailsData({ reviewId })
	const review = data?.review
	const Razorpay = useRazorpay()

	const handlePaymentRequest = useCallback(async () => {
		try {
			const { orderId, idKey, amount, currency, name, description } =
				await apiReviewPaymentIntentGet({ reviewId, token })

			const razorpayInstance = new Razorpay({
				key: idKey,
				order_id: orderId,
				amount: amount.toString(),
				currency,
				name,
				description,
				handler: (args) => {
					if (args.razorpay_payment_id) {
						successToast("Payment Successful")
						refetch()
					} else {
						errorToast("Something went wrong")
					}
				},
			})
			razorpayInstance.open()
		} catch (err) {
			errorToast(getErrorMessage(err))
		}
	}, [token, Razorpay, refetch, errorToast, successToast, reviewId])

	if (!review) return null

	return (
		<Box>
			<Button size={"sm"} mt={1} colorScheme="blue" onClick={handlePaymentRequest}>
				Pay {formatInr(review.price)} INR to Continue
			</Button>
		</Box>
	)
}
