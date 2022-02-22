import { Box, Button, Heading, useDisclosure } from "@chakra-ui/react"
import { ComponentProps, FC } from "react"
import { FeedbackAddDrawer } from "./feedbackAdd/FeedbackAddDrawer"
import { FeedbackList } from "./feedbackList/FeedbackList"

interface IProps extends ComponentProps<typeof Box> {
	reviewId: number
	isLawyer: boolean
}

export const ReviewFeedback: FC<IProps> = ({ reviewId, isLawyer, ...rest }) => {
	const addFeedbackDrawer = useDisclosure()

	return (
		<Box {...rest}>
			<Heading size={"md"}>Feedbacks</Heading>
			<FeedbackList reviewId={reviewId} isLawyer={isLawyer} />

			<Button size={"sm"} mt={1} onClick={addFeedbackDrawer.onOpen}>
				Add Feedback
			</Button>
			<FeedbackAddDrawer reviewId={reviewId} {...addFeedbackDrawer} />
		</Box>
	)
}
