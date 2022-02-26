import { Box, Flex, Table, Tbody, Td, Text, Tr, useDisclosure } from "@chakra-ui/react"
import _ from "lodash"
import { FC, useState } from "react"
import { BsFileEarmarkImage } from "react-icons/bs"
import { downloadFileFromBase64 } from "../../../../utils/fileDownload/downloadFileFromBase64"
import { getErrorMessage } from "../../../../utils/helpers"
import { storage } from "../../../../utils/storage"
import { DeleteIconButton } from "../../components/ui/DeleteIconButton"
import DeleteItemDialog from "../../components/ui/DeleteItemDialog"
import { DownloadIconButton } from "../../components/ui/DownloadIconButton"
import { useErrorToast } from "../../hooks/useErrorToast"
import { useSuccessToast } from "../../hooks/useSuccessToast"
import { ReviewStatus } from "../../review/IReview"
import { useReviewDetailsData } from "../reviewDetails.query"
import { apiReviewDocumentDelete } from "./reviewDocumentDelete.api"
import { apiReviewDocumentGet } from "./reviewDocumentGet.api"

interface IProps {
	reviewId: number
	isLawyer: boolean
}

export const ReviewDocumentList: FC<IProps> = ({ reviewId, isLawyer }) => {
	const auth = storage.getAuth()
	const token = auth?.token

	const { data, refetch } = useReviewDetailsData({ reviewId })
	const documents = data?.documentList

	const errorToast = useErrorToast()
	const successToast = useSuccessToast()

	const [fileForDelete, setFileForDelete] = useState<string>()
	const [isLoading, setIsLoading] = useState(false)
	const deleteDialog = useDisclosure()

	const handleOnDownload = (fileName: string) => {
		if (!token) return

		apiReviewDocumentGet({ reviewId, fileName, token })
			.then(({ base64File }) => downloadFileFromBase64(base64File, fileName))
			.catch((err) => errorToast(getErrorMessage(err)))
	}

	const handleOnDelete = (fileName: string) => {
		if (!token) return

		setIsLoading(true)
		apiReviewDocumentDelete({ reviewId, fileName, token })
			.then(() => {
				successToast("Document deleted")
				deleteDialog.onClose()
				refetch()
			})
			.catch((err) => errorToast(getErrorMessage(err)))
			.finally(() => setIsLoading(false))
	}

	if (_.isEmpty(documents)) {
		if (!isLawyer && data?.review.status !== ReviewStatus.CLOSED) return null
		return (
			<Box>
				<Text>No uploaded documents</Text>
			</Box>
		)
	}

	return (
		<Box
			mt={2}
			border={"1px"}
			borderRadius="lg"
			overflow={"hidden"}
			borderColor="gray.200"
			maxW={"xl"}
		>
			<Table size={"sm"}>
				<Tbody>
					{documents?.map((el, i) => (
						<Tr key={i}>
							<Td>
								<Flex gap={2}>
									<BsFileEarmarkImage />
									<Text fontWeight={"semibold"}>{el}</Text>
								</Flex>
							</Td>
							<Td isNumeric>
								<DownloadIconButton onClick={() => handleOnDownload(el)} />
								{!isLawyer && (
									<DeleteIconButton
										onClick={() => {
											setFileForDelete(el)
											deleteDialog.onOpen()
										}}
									/>
								)}
							</Td>
						</Tr>
					))}
				</Tbody>
			</Table>

			{fileForDelete && (
				<DeleteItemDialog
					title={`Delete Document: ${fileForDelete}`}
					onCancel={deleteDialog.onClose}
					onDelete={() => handleOnDelete(fileForDelete)}
					isLoading={isLoading}
					{...deleteDialog}
				/>
			)}
		</Box>
	)
}
