import {
	Box,
	Heading,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	Text,
	Flex,
	Button,
} from "@chakra-ui/react"
import _ from "lodash"
import { FC } from "react"
import { formatInr } from "../../../utils/helpers"
import { CenteredSpinner } from "../../shared/components/ui/CenterSpinner"
import { DeleteIconButton } from "../../shared/components/ui/DeleteIconButton"
import { EditIconButton } from "../../shared/components/ui/EditIconButton"
import { EmptyState } from "../../shared/components/ui/EmptyState"
import { useOfferingDeleteStore } from "./offeringDelete/useOfferingDeleteStore"
import { useOfferingUpdateStore } from "./offeringUpdate/useOfferingUpdateStore"
import { useLawyerOfferingStore } from "./useLawyerOfferingStore"

export const OfferingList: FC = () => {
	const { offerings, isOfferingsLoading } = useLawyerOfferingStore()
	const { setSelectedOffering: setSelectedOfferingForDelete, setIsDeleteDialogOpen } =
		useOfferingDeleteStore()
	const { setSelectedOffering: setSelectedOfferingForUpdate, setIsDrawerOpen } =
		useOfferingUpdateStore()

	if (isOfferingsLoading) return <CenteredSpinner />

	if (_.isEmpty(offerings)) {
		return <EmptyState headingText="No Offerings" />
	}

	return (
		<Box>
			{/** For Mobile */}
			<Box display={{ sm: "none" }}>
				{offerings?.map((offering) => (
					<Box
						key={offering.id}
						m={4}
						p={4}
						border="1px"
						borderColor={"gray.300"}
						borderRadius={"lg"}
					>
						<Heading size={"lg"}>{offering.paperType.name}</Heading>
						<Text>Language: {offering.language.name}</Text>
						<Text>
							Price: <b>{formatInr(offering.price)} INR</b>
						</Text>
						<Text>Expected Duration: {offering.expectedTimeInHours} Hrs</Text>
						<Text>Status: {offering.isAvailable ? "ACTIVE" : "DISABLED"}</Text>
						<Flex gap={2} mt={2}>
							<Button
								size={"sm"}
								variant={"outline"}
								colorScheme="yellow"
								onClick={() => {
									setSelectedOfferingForUpdate(offering)
									setIsDrawerOpen(true)
								}}
							>
								Edit
							</Button>
							<Button
								size={"sm"}
								variant={"outline"}
								colorScheme="red"
								onClick={() => {
									setSelectedOfferingForDelete(offering)
									setIsDeleteDialogOpen(true)
								}}
							>
								Delete
							</Button>
						</Flex>
					</Box>
				))}
			</Box>

			{/** For Desktop  */}
			<Table size="sm" fontSize={"lg"} display={{ base: "none", sm: "table" }}>
				<Thead>
					<Tr>
						<Th>Paper Type</Th>
						<Th>Language</Th>
						<Th isNumeric>Expected Duration</Th>
						<Th isNumeric>Price (INR)</Th>
						<Th isNumeric>Status</Th>
						<Th isNumeric></Th>
					</Tr>
				</Thead>
				<Tbody>
					{offerings?.map((offering) => (
						<Tr
							key={offering.id}
							cursor="pointer"
							_hover={{ backgroundColor: "gray.100" }}
						>
							<Td fontWeight={"semibold"}>{offering.paperType.name}</Td>
							<Td>{offering.language.name}</Td>
							<Td isNumeric>{offering.expectedTimeInHours} Hrs</Td>
							<Td isNumeric>{formatInr(offering.price)}</Td>
							<Td isNumeric>{offering.isAvailable ? "ACTIVE" : "DISABLED"}</Td>
							<Td isNumeric onClick={(e) => e.stopPropagation()}>
								<EditIconButton
									onClick={() => {
										setSelectedOfferingForUpdate(offering)
										setIsDrawerOpen(true)
									}}
								/>
								<DeleteIconButton
									onClick={() => {
										setSelectedOfferingForDelete(offering)
										setIsDeleteDialogOpen(true)
									}}
								/>
							</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</Box>
	)
}
