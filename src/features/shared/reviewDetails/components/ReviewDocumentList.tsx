import { Box, Flex, Table, Tbody, Td, Text, Tr } from "@chakra-ui/react"
import _ from "lodash"
import { FC } from "react"
import { BsFileEarmarkImage } from "react-icons/bs"
import { DeleteIconButton } from "../../components/ui/DeleteIconButton"
import { DownloadIconButton } from "../../components/ui/DownloadIconButton"
import { useReviewDetailsData } from "../queries/reviewDetails.query"

interface IProps {
	reviewId: number
	isLawyer: boolean
}

export const ReviewDocumentList: FC<IProps> = ({ reviewId, isLawyer }) => {
	const { data } = useReviewDetailsData({ reviewId })
	const documents = data?.documentList

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
								<DownloadIconButton />
								{!isLawyer && <DeleteIconButton />}
							</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</Box>
	)
}
