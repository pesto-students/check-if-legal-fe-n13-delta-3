import { Text } from "@chakra-ui/react"
import { FC } from "react"
import { useReviewDetailsStore } from "../useReviewDetailsStore"
import { AddReviewNoteBox } from "./AddReviewNote"

export const ReviewNote: FC = () => {
	const { review } = useReviewDetailsStore()
	if (!review) return null

	if (!review.userNote) return <AddReviewNoteBox />

	return <Text>{review.userNote}</Text>
}
