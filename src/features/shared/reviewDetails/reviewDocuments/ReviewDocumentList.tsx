import { Box, Flex, Table, Tbody, Td, Text, Tr } from "@chakra-ui/react"
import _ from "lodash"
import { FC } from "react"
import { BsFileEarmarkImage } from "react-icons/bs"
import { DeleteIconButton } from "../../components/ui/DeleteIconButton"
import { DownloadIconButton } from "../../components/ui/DownloadIconButton"
import { useReviewDetailsStore } from "../useReviewDetailsStore"

export const ReviewDocumentList: FC = () => {
	const { documents, isLawyer } = useReviewDetailsStore()

	if (_.isEmpty(documents)) {
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
