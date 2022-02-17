import { Box, Heading } from "@chakra-ui/react"
import { FC } from "react"
import { useReviewDetailsStore } from "../useReviewDetailsStore"
import { ReviewDocumentList } from "./ReviewDocumentList"
import { UploadDocumentsForm } from "./UploadDocumentsForm"

export const ReviewDocuments: FC = () => {
	const { isLawyer } = useReviewDetailsStore()

	return (
		<Box>
			<Heading size={"md"}>Documents</Heading>
			<ReviewDocumentList />
			{!isLawyer && <UploadDocumentsForm />}
		</Box>
	)
}
