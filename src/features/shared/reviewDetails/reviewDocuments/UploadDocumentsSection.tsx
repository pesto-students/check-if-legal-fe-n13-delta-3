import { Box, Button, Text, useDisclosure } from "@chakra-ui/react"
import _ from "lodash"
import { FC, useCallback, useState } from "react"
import { getErrorMessage } from "../../../../utils/helpers"
import { useUserAuth } from "../../../user/useUserAuth"
import { FileUploadModal } from "../../components/fileUploadModal/FileUploadModal"
import { useErrorToast } from "../../hooks/useErrorToast"
import { useSuccessToast } from "../../hooks/useSuccessToast"
import { useReviewDetailsData } from "../reviewDetails.query"
import { apiReviewDocumentsUpload } from "./reviewDocumentsUpload.api"

interface IProps {
	reviewId: number
}

export const UploadDocumentsSection: FC<IProps> = ({ reviewId }) => {
	const { token } = useUserAuth()
	const [isLoading, setIsLoading] = useState(false)

	const { data, refetch } = useReviewDetailsData({ reviewId })
	const documents = data?.documentList

	const fileUploadModal = useDisclosure()
	const errorToast = useErrorToast()
	const successToast = useSuccessToast()

	const onDrop = useCallback(
		async (files: File[]) => {
			setIsLoading(true)

			try {
				const formData = new FormData()
				for (const file of files) formData.append("documents", file)

				await apiReviewDocumentsUpload({ id: reviewId, formData, token })
				successToast("Documents uploaded successfully")
				fileUploadModal.onClose()
				refetch()
			} catch (err) {
				errorToast(getErrorMessage(err))
			} finally {
				setIsLoading(false)
			}
		},
		[reviewId, token, errorToast, successToast, refetch, fileUploadModal],
	)

	const isDocumentEmpty = _.isEmpty(documents)
	const acceptFileExts = [".pdf", ".PDF", ".jpg", ".JPG", ".jpeg", ".JPEG"]

	return (
		<Box mt={2} maxW={"xl"}>
			{isDocumentEmpty && (
				<Text maxW={"sm"}>
					Upload all the necessary documents required for the review process in image
					or PDF format
				</Text>
			)}

			<Button
				mt={1}
				colorScheme={isDocumentEmpty ? "blue" : undefined}
				size="sm"
				onClick={() => fileUploadModal.onOpen()}
			>
				{isDocumentEmpty ? "Upload Documents" : "Upload More Documents"}
			</Button>

			<FileUploadModal
				onDrop={onDrop}
				multiple
				maxFiles={10}
				isLoading={isLoading}
				accept={acceptFileExts}
				contentText={"PNG, JPG files supported upto 20MB"}
				{...fileUploadModal}
			/>
		</Box>
	)
}
