import { Box, Button, Heading, useDisclosure } from "@chakra-ui/react"
import { ComponentProps, FC } from "react"
import { ReviewStatus } from "../../review/IReview"
import { useReviewDetailsData } from "../reviewDetails.query"
import { FeedbackAddDrawer } from "./feedbackAdd/FeedbackAddDrawer"
import { FeedbackList } from "./FeedbackList"

interface IProps extends ComponentProps<typeof Box> {
	reviewId: number
	isLawyer: boolean
}

export const ReviewFeedback: FC<IProps> = ({ reviewId, isLawyer, ...rest }) => {
	const { data } = useReviewDetailsData({ reviewId })
	const addFeedbackDrawer = useDisclosure()

	const toShowAddFeedback = data?.review.status !== ReviewStatus.CLOSED

	return (
		<Box {...rest}>
			<Heading size={"md"}>Feedbacks</Heading>
			<FeedbackList reviewId={reviewId} isLawyer={isLawyer} />

			{toShowAddFeedback && (
				<>
					<Button size={"sm"} mt={1} onClick={addFeedbackDrawer.onOpen}>
						Add Feedback
					</Button>
					<FeedbackAddDrawer reviewId={reviewId} {...addFeedbackDrawer} />
				</>
			)}
		</Box>
	)
}
