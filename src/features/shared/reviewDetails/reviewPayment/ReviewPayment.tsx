import { Box, Heading, Text } from "@chakra-ui/react"
import { FC, useEffect } from "react"
import { useUserAuth } from "../../../user/useUserAuth"
import { ReviewStatus } from "../../review/IReview"
import { useReviewDetailsStore } from "../useReviewDetailsStore"
import { RazorpayPayment } from "./RazorpayPayment"
import { useReviewPaymentStore } from "./useReviewPaymentStore"

export const ReviewPayment: FC = () => {
	const { review } = useReviewDetailsStore()
	const { token } = useUserAuth()
	const { payment, fetchPayment } = useReviewPaymentStore()

	useEffect(() => {
		if (!review) return
		fetchPayment({ reviewId: review.id, token })
	}, [review, fetchPayment, token])

	if (!review) return null

	const toHidePaymentSection = [ReviewStatus.INITIAL].includes(review.status)
	if (toHidePaymentSection) return null

	if (payment) return null

	return (
		<Box>
			<Heading size={"md"}>Payment Details</Heading>
			<Text maxW={"md"}>
				You will be taken to online payment gateway, once payment completes it will be
				sent for the review
			</Text>
			<RazorpayPayment />
		</Box>
	)
}
