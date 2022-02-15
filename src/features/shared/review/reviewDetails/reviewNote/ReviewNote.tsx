import { Box, Button, Heading, Text } from "@chakra-ui/react"
import { FC } from "react"
import { useReviewDetailsStore } from "../useReviewDetailsStore"
import { AddReviewNoteBox } from "./AddReviewNote"
import { ReviewNoteUpdateDrawer } from "./updateReviewNote/ReviewNoteUpdateDrawer"
import { useReviewNoteUpdateStore } from "./updateReviewNote/useReviewNoteUpdateStore"

export const ReviewNote: FC = () => {
	const { setIsDrawerOpen } = useReviewNoteUpdateStore()
	const { isLawyer, review } = useReviewDetailsStore()
	if (!review) return null

	if (!review.userNote) return <AddReviewNoteBox />

	return (
		<Box>
			<Heading size={"md"}>Review Note</Heading>

			{review.userNote ? (
				<Text maxW={"xl"}>{review.userNote}</Text>
			) : (
				<AddReviewNoteBox />
			)}

			{!isLawyer && (
				<Button mt={2} size="sm" onClick={() => setIsDrawerOpen(true)}>
					Update Note
				</Button>
			)}

			<ReviewNoteUpdateDrawer />
		</Box>
	)
}
