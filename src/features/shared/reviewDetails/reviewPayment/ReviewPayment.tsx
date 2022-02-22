import { Box, Heading, Text } from "@chakra-ui/react"
import { ComponentProps, FC } from "react"
import { ReviewStatus } from "../../review/IReview"
import { ReviewPaymentStatus } from "./IReviewPayment"
import { useReviewDetailsData } from "../reviewDetails.query"
import { RazorpayPayment } from "./RazorpayPayment"

interface IProps extends ComponentProps<typeof Box> {
	reviewId: number
}

export const ReviewPayment: FC<IProps> = ({ reviewId, ...rest }) => {
	const { data } = useReviewDetailsData({ reviewId })
	const review = data?.review
	const payment = data?.payment

	if (!review) return null

	const toHidePaymentSection = review.status === ReviewStatus.INITIAL
	const isPaymentPaid = payment && payment.status === ReviewPaymentStatus.PAID

	if (toHidePaymentSection) return null

	return (
		<Box {...rest}>
			<Heading size={"md"}>Payment Details</Heading>
			{isPaymentPaid && (
				<Box mt={1}>
					<Text>Payment Status: PAID</Text>
					<Text>Payment Id: {reviewId}</Text>
					<Text>Transaction Id: {payment.orderId.split("_")[1]?.toUpperCase()}</Text>
				</Box>
			)}
			{!isPaymentPaid && (
				<>
					<Text maxW={"md"} mt={1}>
						You will be taken to online payment gateway, once payment completes this
						review will be sent to lawyer
					</Text>
					<RazorpayPayment reviewId={reviewId} />
				</>
			)}
		</Box>
	)
}
