import { Box, Flex, Table, Tbody, Td, Text, Tr } from "@chakra-ui/react"
import _ from "lodash"
import { FC } from "react"
import { BsFileEarmarkImage } from "react-icons/bs"
import { downloadFileFromBase64 } from "../../../../utils/fileDownload/downloadFileFromBase64"
import { getErrorMessage } from "../../../../utils/helpers"
import { storage } from "../../../../utils/storage"
import { DeleteIconButton } from "../../components/ui/DeleteIconButton"
import { DownloadIconButton } from "../../components/ui/DownloadIconButton"
import { useErrorToast } from "../../hooks/useErrorToast"
import { useReviewDetailsData } from "../reviewDetails.query"
import { apiReviewDocumentGet } from "./reviewDocumentGet.api"

interface IProps {
	reviewId: number
	isLawyer: boolean
}

export const ReviewDocumentList: FC<IProps> = ({ reviewId, isLawyer }) => {
	const auth = storage.getAuth()
	const token = auth?.token

	const { data } = useReviewDetailsData({ reviewId })
	const documents = data?.documentList

	const errorToast = useErrorToast()

	const handleOnDownload = (fileName: string) => {
		if (!token) return

		apiReviewDocumentGet({ reviewId, fileName, token })
			.then(({ base64File }) => {
				downloadFileFromBase64(base64File, fileName)
			})
			.catch((err) => errorToast(getErrorMessage(err)))
	}

	if (_.isEmpty(documents)) {
		if (!isLawyer) return null
		return (
			<Box>
				<Text>No documents uploaded</Text>
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
								{!isLawyer && <DeleteIconButton />}
							</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</Box>
	)
}
