import { Box, Button, Heading, Text } from "@chakra-ui/react"
import { FC } from "react"
import { useReviewDetailsStore } from "../useReviewDetailsStore"
import { ReviewNoteUpdateDrawer } from "./updateReviewNote/ReviewNoteUpdateDrawer"
import { useReviewNoteUpdateStore } from "./updateReviewNote/useReviewNoteUpdateStore"

export const ReviewNote: FC = () => {
	const { setIsDrawerOpen } = useReviewNoteUpdateStore()
	const { isLawyer, review } = useReviewDetailsStore()
	if (!review) return null

	return (
		<Box>
			<Heading size={"md"}>Review Note</Heading>

			{review.userNote && <Text maxW={"xl"}>{review.userNote}</Text>}
			{!isLawyer && <ReviewNoteUpdateDrawer />}

			{!review.userNote && isLawyer ? (
				<Box>
					<Text maxW={"sm"}>No note proved for review.</Text>
				</Box>
			) : (
				<Box>
					<Text maxW={"sm"}>
						Add more info in words regarding papers review, it will help lawyer to
						understand better.
					</Text>
					<Button mt={2} size="sm" onClick={() => setIsDrawerOpen(true)}>
						Add Review Note
					</Button>
				</Box>
			)}

			{review.userNote && !isLawyer && (
				<>
					<Button mt={2} size="sm" onClick={() => setIsDrawerOpen(true)}>
						Update Note
					</Button>
				</>
			)}
		</Box>
	)
}
