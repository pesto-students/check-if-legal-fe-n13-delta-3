import { Box, Flex, ListItem, Text, UnorderedList, useDisclosure } from "@chakra-ui/react"
import _ from "lodash"
import { FC, useState } from "react"
import { normalizeDateTime } from "../../../../utils/helpers"
import { DeleteIconButton } from "../../components/ui/DeleteIconButton"
import { useReviewDetailsData } from "../reviewDetails.query"
import { FeedbackDeleteDialog } from "./feedbackDelete/FeedbackDeleteDialog"
import { IReviewFeedback } from "./IReviewFeedback"

interface IProps {
	reviewId: number
	isLawyer: boolean
}

export const FeedbackList: FC<IProps> = ({ reviewId, isLawyer }) => {
	const { data } = useReviewDetailsData({ reviewId })
	const feedbackList = data?.feedbackList

	const [selectedFeedback, setSelectedFeedback] = useState<IReviewFeedback>()
	const feedbackDeleteDialog = useDisclosure()

	if (_.isEmpty(feedbackList)) return <Box>No Feedbacks</Box>
	if (!feedbackList) return null

	return (
		<Box>
			<UnorderedList>
				{feedbackList.map((feedback) => {
					let feedbackCreatedByText = ""
					if (isLawyer) {
						feedbackCreatedByText = feedback.byLawyer ? "you" : "user"
					} else {
						feedbackCreatedByText = feedback.byLawyer ? "lawyer" : "you"
					}

					return (
						<ListItem my={4} key={feedback.id}>
							<Flex fontSize={"lg"} gap={2} alignItems="center">
								<Text fontWeight={"bold"}>
									{normalizeDateTime(feedback.createdAt)}
								</Text>
								<Text>by {feedbackCreatedByText}</Text>
								<DeleteIconButton
									onClick={() => {
										setSelectedFeedback(feedback)
										feedbackDeleteDialog.onOpen()
									}}
								/>
							</Flex>
							<Text maxW={"lg"}>{feedback.description}</Text>
						</ListItem>
					)
				})}
			</UnorderedList>

			{selectedFeedback && (
				<FeedbackDeleteDialog
					reviewId={reviewId}
					selectedFeedback={selectedFeedback}
					{...feedbackDeleteDialog}
				/>
			)}
		</Box>
	)
}
