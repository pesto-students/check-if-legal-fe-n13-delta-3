import { Avatar, Box, Button, Flex, useDisclosure } from "@chakra-ui/react"
import { FC, useCallback, useState } from "react"
import { getErrorMessage, getLawyerProfileUrl } from "../../../../utils/helpers"
import { FileUploadModal } from "../../../shared/components/fileUploadModal/FileUploadModal"
import { useErrorToast } from "../../../shared/hooks/useErrorToast"
import { useSuccessToast } from "../../../shared/hooks/useSuccessToast"
import { useLawyerData } from "../../lawyer.query"
import { useLawyerAuth } from "../../useLawyerAuth"
import { apiLawyerPictureUpload } from "./lawyerSelfPictureUpload.api"

export const LawyerProfilePicture: FC = () => {
	const { token } = useLawyerAuth()
	const { data: lawyer } = useLawyerData()

	const fileUploadModal = useDisclosure()
	const [isLoading, setIsLoading] = useState(false)
	const errorToast = useErrorToast()
	const successToast = useSuccessToast()

	const onDrop = useCallback(
		(files: File[]) => {
			setIsLoading(true)

			const formData = new FormData()
			try {
				for (const file of files) formData.append("picture", file)
			} catch (err) {
				errorToast(getErrorMessage(err))
			}

			apiLawyerPictureUpload({ formData, token })
				.then(() => {
					successToast("Profile picture updated successfully")
					fileUploadModal.onClose()
					window.location.reload()
				})
				.catch((err) => errorToast(getErrorMessage(err)))
				.finally(() => setIsLoading(false))
		},
		[token, errorToast, successToast, fileUploadModal],
	)

	if (!lawyer) return null
	const acceptFileExts = [".jpg", ".JPG", ".jpeg", ".JPEG"]
	const profileSrc = getLawyerProfileUrl(lawyer.id)

	return (
		<Box>
			<Flex direction={"column"} alignItems="center">
				<Avatar size={"2xl"} src={profileSrc} name={lawyer.name} />
				<Button
					size={"sm"}
					mt={3}
					colorScheme="blackAlpha"
					onClick={fileUploadModal.onOpen}
				>
					Update Profile Picture
				</Button>
			</Flex>

			<FileUploadModal
				onDrop={onDrop}
				isLoading={isLoading}
				accept={acceptFileExts}
				contentText={"only JPG file supported"}
				{...fileUploadModal}
			/>
		</Box>
	)
}
