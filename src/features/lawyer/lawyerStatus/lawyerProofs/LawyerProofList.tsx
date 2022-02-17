import { Box, Flex, Table, Tbody, Td, Text, Tr } from "@chakra-ui/react"
import _ from "lodash"
import { FC, useEffect } from "react"
import { BsFileEarmarkImage } from "react-icons/bs"
import { CenteredSpinner } from "../../../shared/components/ui/CenterSpinner"
import { DeleteIconButton } from "../../../shared/components/ui/DeleteIconButton"
import { DownloadIconButton } from "../../../shared/components/ui/DownloadIconButton"
import { useLawyerAuth } from "../../useLawyerAuth"
import { useLawyerProofStore } from "./useLawyerProofStore"

export const LawyerProofList: FC = () => {
	const { token } = useLawyerAuth()
	const { proofs, fetchProofs, isProofsLoading } = useLawyerProofStore()

	useEffect(() => {
		fetchProofs({ token })
	}, [fetchProofs, token])

	if (isProofsLoading || _.isUndefined(proofs)) return <CenteredSpinner />
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
								<DeleteIconButton />
							</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</Box>
	)
}
