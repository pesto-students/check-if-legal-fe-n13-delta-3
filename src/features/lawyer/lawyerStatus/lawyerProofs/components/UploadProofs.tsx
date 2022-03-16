import { Box, Button, Text, useDisclosure } from "@chakra-ui/react"
import _ from "lodash"
import { FC, useCallback, useState } from "react"
import { getErrorMessage } from "../../../../../utils/helpers"
import { FileUploadModal } from "../../../../shared/components/fileUploadModal/FileUploadModal"
import { useErrorToast } from "../../../../shared/hooks/useErrorToast"
import { useSuccessToast } from "../../../../shared/hooks/useSuccessToast"
import { useLawyerAuth } from "../../../useLawyerAuth"
import { apiLawyerProofsUpload } from "../apis/lawyerProofsUpload.api"
import { useLawyerProofData } from "../lawyerProof.query"

export const UploadProofs: FC = () => {
	const { token } = useLawyerAuth()
	const { data: proofs, refetch } = useLawyerProofData()

	const [isLoading, setIsLoading] = useState(false)
	const fileUploadModal = useDisclosure()
	const errorToast = useErrorToast()
	const successToast = useSuccessToast()

	const onDrop = useCallback(
		async (files: File[]) => {
			setIsLoading(true)

			try {
				const formData = new FormData()
				for (const file of files) formData.append("proofs", file)
				await apiLawyerProofsUpload({ formData, token })

				successToast("Documents uploaded successfully")
				fileUploadModal.onClose()
				refetch()
			} catch (err) {
				errorToast(getErrorMessage(err))
			} finally {
				setIsLoading(false)
			}
		},
		[token, errorToast, successToast, refetch, fileUploadModal],
	)

	const isProofEmpty = _.isEmpty(proofs)
	const acceptFileExts = [
		".pdf",
		".PDF",
		".jpg",
		".JPG",
		".jpeg",
		".JPEG",
		".png",
		".PNG",
	]

	return (
		<Box mt={1} maxW={"xl"}>
			{isProofEmpty && (
				<Text maxW={"sm"}>
					Upload all the necessary proofs required for the review process in PNG, JPG
					or PDF format
				</Text>
			)}
			<Button
				mt={1}
				colorScheme={isProofEmpty ? "blue" : undefined}
				size="sm"
				onClick={() => fileUploadModal.onOpen()}
			>
				{isProofEmpty ? "Upload Documents" : "Upload More Documents"}
			</Button>

			<FileUploadModal
				onDrop={onDrop}
				multiple
				maxFiles={5}
				isLoading={isLoading}
				accept={acceptFileExts}
				contentText={"PDF, PNG and JPG files supported"}
				{...fileUploadModal}
			/>
		</Box>
	)
}
