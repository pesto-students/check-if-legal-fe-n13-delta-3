import { Box, Flex, Table, Tbody, Td, Text, Tr, useDisclosure } from "@chakra-ui/react"
import _ from "lodash"
import { FC, useState } from "react"
import { BsFileEarmarkImage } from "react-icons/bs"
import { CenteredSpinner } from "../../../../shared/components/ui/CenterSpinner"
import { DeleteIconButton } from "../../../../shared/components/ui/DeleteIconButton"
import { DownloadIconButton } from "../../../../shared/components/ui/DownloadIconButton"
import { useLawyerAuth } from "../../../useLawyerAuth"
import { useLawyerProofQuery } from "../lawyerProof.query"
import { ProofDeleteDialog } from "./ProofDeleteDialog"

export const LawyerProofList: FC = () => {
	const { token } = useLawyerAuth()
	const { data: proofs, isLoading } = useLawyerProofQuery({ token })

	const [selectedFile, setSelectedFile] = useState<string>()
	const deleteDialog = useDisclosure()

	if (isLoading) return <CenteredSpinner />
	if (_.isEmpty(proofs)) return null

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
					{proofs?.map((el, i) => (
						<Tr key={i}>
							<Td>
								<Flex gap={2}>
									<BsFileEarmarkImage />
									<Text fontWeight={"semibold"}>{el}</Text>
								</Flex>
							</Td>
							<Td isNumeric>
								<DownloadIconButton />
								<DeleteIconButton
									onClick={() => {
										setSelectedFile(el)
										deleteDialog.onOpen()
									}}
								/>
							</Td>
						</Tr>
					))}
				</Tbody>
			</Table>

			{selectedFile && <ProofDeleteDialog fileName={selectedFile} {...deleteDialog} />}
		</Box>
	)
}
