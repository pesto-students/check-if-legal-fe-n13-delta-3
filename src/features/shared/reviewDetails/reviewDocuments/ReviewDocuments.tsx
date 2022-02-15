import { Box, Heading } from "@chakra-ui/react"
import { FC } from "react"
import { ReviewDocumentList } from "./ReviewDocumentList"
import { UploadDocumentsForm } from "./UploadDocumentsForm"

export const ReviewDocuments: FC = () => {
	return (
		<Box>
			<Heading size={"md"}>Documents</Heading>
			<ReviewDocumentList />
			<UploadDocumentsForm />
		</Box>
	)
}
