import { Box, Button, Text, useDisclosure } from "@chakra-ui/react"
import _ from "lodash"
import { FC, useCallback, useState } from "react"
import { getErrorMessage } from "../../../../utils/helpers"
import { useUserAuth } from "../../../user/useUserAuth"
import { FileUploadModal } from "../../components/fileUploadModal/FileUploadModal"
import { useErrorToast } from "../../hooks/useErrorToast"
import { useSuccessToast } from "../../hooks/useSuccessToast"
import { apiReviewDocumentsUpload } from "../apis/apiReviewDocumentsUpload"
import { useReviewDetailsQuery } from "../queries/reviewDetails.query"

interface IProps {
	reviewId: number
}

export const UploadDocumentsSection: FC<IProps> = ({ reviewId }) => {
	const { token } = useUserAuth()
	const [isLoading, setIsLoading] = useState(false)

	const { data, refetch } = useReviewDetailsQuery({ reviewId, token })
	const documents = data?.documentList

	const fileUploadModal = useDisclosure()
	const errorToast = useErrorToast()
	const successToast = useSuccessToast()

	const onDrop = useCallback(
		(files: File[]) => {
			setIsLoading(true)

			const formData = new FormData()
			try {
				for (const file of files) formData.append("documents", file)
			} catch (err) {
				errorToast(getErrorMessage(err))
			}

			apiReviewDocumentsUpload({ id: reviewId, formData, token })
				.then(() => {
					successToast("Documents uploaded successfully")
					refetch()
				})
				.catch((err) => errorToast(getErrorMessage(err)))
				.finally(() => setIsLoading(false))
		},
		[reviewId, token, errorToast, successToast, refetch],
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
				{...fileUploadModal}
				contentText={"PNG, JPG files supported upto 20MB"}
			/>
		</Box>
	)
}
