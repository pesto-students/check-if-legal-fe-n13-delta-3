import { Box, Heading, Text } from "@chakra-ui/react"
import { FC } from "react"
import { ReviewStatus } from "../../review/IReview"
import { useReviewDetailsStore } from "../useReviewDetailsStore"
import { RazorpayPayment } from "./RazorpayPayment"

export const ReviewPayment: FC = () => {
	const { review } = useReviewDetailsStore()
	if (!review) return null

	const toHidePaymentSection = [ReviewStatus.INITIAL].includes(review.status)
	if (toHidePaymentSection) return null

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
