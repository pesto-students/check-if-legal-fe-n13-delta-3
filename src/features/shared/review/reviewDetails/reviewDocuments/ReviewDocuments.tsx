import { Text } from "@chakra-ui/react"
import { FC } from "react"
import { useReviewDetailsStore } from "../useReviewDetailsStore"
import { UploadDocuments } from "./UploadDocuments"

export const ReviewDocuments: FC = () => {
	const { review } = useReviewDetailsStore()
	if (!review) return null

	if (!review.userNote) return <UploadDocuments />

	return <Text>{review.userNote}</Text>
}
