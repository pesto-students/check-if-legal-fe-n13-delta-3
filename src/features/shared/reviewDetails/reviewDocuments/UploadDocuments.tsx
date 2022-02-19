import { Box, Button, Text, useDisclosure } from "@chakra-ui/react"
import _ from "lodash"
import { FC, useCallback, useState } from "react"
import { getErrorMessage } from "../../../../utils/helpers"
import { useUserAuth } from "../../../user/useUserAuth"
import { FileUploadModal } from "../../components/fileUploadModal/FileUploadModal"
import { useErrorToast } from "../../hooks/useErrorToast"
import { useSuccessToast } from "../../hooks/useSuccessToast"
import { useReviewDetailsStore } from "../useReviewDetailsStore"
import { reviewDocumentsUploadApi } from "./reviewDocumentsUploadApi"

export const UploadDocuments: FC = () => {
	const { token } = useUserAuth()
	const { review, fetchReview, documents } = useReviewDetailsStore()
	const [isLoading, setIsLoading] = useState(false)

	const fileUploadModal = useDisclosure()
	const errorToast = useErrorToast()
	const successToast = useSuccessToast()

	const onDrop = useCallback(
		(files: File[]) => {
			setIsLoading(true)
			if (!review) return

			const formData = new FormData()
			try {
				for (const file of files) formData.append("documents", file)
			} catch (err) {
				errorToast(getErrorMessage(err))
			} finally {
				setIsLoading(false)
			}

			reviewDocumentsUploadApi({ id: review.id, formData, token })
				.then(() => {
					successToast("Documents uploaded successfully")
					fetchReview({ id: review.id, token })
				})
				.catch((err) => errorToast(getErrorMessage(err)))
				.finally(() => setIsLoading(false))
		},
		[fetchReview, review, token, errorToast, successToast],
	)

	if (!review) return null

	return (
		<Box mt={2} maxW={"xl"}>
			{_.isEmpty(documents) && (
				<Text maxW={"sm"}>
					Upload all the necessary documents required for the review process in image
					or PDF format
				</Text>
			)}

			<Button colorScheme={"blue"} size="sm" onClick={() => fileUploadModal.onOpen()}>
				Upload Documents
			</Button>

			<FileUploadModal
				onDrop={onDrop}
				multiple
				maxFiles={10}
				isLoading={isLoading}
				{...fileUploadModal}
			/>
		</Box>
	)
}
