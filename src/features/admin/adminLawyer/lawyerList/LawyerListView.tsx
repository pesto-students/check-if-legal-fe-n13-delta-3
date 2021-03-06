import {
	Avatar,
	Badge,
	Flex,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react"
import { FC, useEffect } from "react"
import { CenteredSpinner } from "../../../shared/components/ui/CenterSpinner"
import { getLawyerProfileUrl, normalizeDateTime } from "../../../../utils/helpers"
import { useAdminAuth } from "../../useAdminAuth"
import { VerifyLawyerButton } from "../lawyerVerify/VerifyLawyerButton"
import { useLawyerStore } from "./useLawyerStore"

export const LawyerListView: FC = () => {
	const { token } = useAdminAuth()
	const { lawyers, isLawyersLoading, fetchLawyers } = useLawyerStore()

	useEffect(() => {
		fetchLawyers({ token })
	}, [fetchLawyers, token])

	if (isLawyersLoading || !lawyers) return <CenteredSpinner />

	return (
		<Table size="sm" fontSize={"lg"} mt={4}>
			<Thead>
				<Tr>
					<Th>Name</Th>
					<Th>City</Th>
					<Th>Verification Status</Th>
					<Th>Last Modified</Th>
				</Tr>
			</Thead>
			<Tbody>
				{lawyers.map((lawyer) => (
					<Tr
						key={lawyer.id}
						cursor="pointer"
						_hover={{ backgroundColor: "gray.100" }}
					>
						<Td fontWeight={"semibold"}>
							<Flex alignItems={"center"} gap="2">
								<Avatar
									size={"sm"}
									name={lawyer.name}
									src={getLawyerProfileUrl(lawyer.id)}
								/>
								<Text>{lawyer.name}</Text>
							</Flex>
						</Td>
						<Td>{lawyer.city.name}</Td>
						<Td onClick={(e) => e.stopPropagation()}>
							{lawyer.isVerified ? (
								<Badge colorScheme="green">Verified</Badge>
							) : (
								<VerifyLawyerButton lawyer={lawyer} />
							)}
						</Td>
						<Td>{normalizeDateTime(lawyer.updatedAt)}</Td>
					</Tr>
				))}
			</Tbody>
		</Table>
	)
}
