import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { FC } from "react"
import { formatInr } from "../../../utils/helpers"
import { CenteredSpinner } from "../../shared/components/ui/CenterSpinner"
import { DeleteIconButton } from "../../shared/components/ui/DeleteIconButton"
import { EditIconButton } from "../../shared/components/ui/EditIconButton"
import { useLawyerOfferingStore } from "./useLawyerOfferingStore"

export const OfferingList: FC = () => {
	const { offerings, isOfferingsLoading } = useLawyerOfferingStore()
	// const { setSelectedOffering: setSelectedOfferingForDelete, setIsDeleteDialogOpen } =
	// 	useOfferingDeleteStore()
	// const { setSelectedOffering: setSelectedOfferingForUpdate, setIsDrawerOpen } =
	// 	useOfferingUpdateStore()

	// useEffect(() => {
	// 	fetchOfferings()
	// }, [fetchOfferings])

	if (isOfferingsLoading || !offerings) return <CenteredSpinner />

	return (
		<Table size="sm" fontSize={"lg"}>
			<Thead>
				<Tr>
					<Th>Paper Type</Th>
					<Th>Language</Th>
					<Th isNumeric>Expected Duration</Th>
					<Th isNumeric>Price (INR)</Th>
					<Th isNumeric></Th>
				</Tr>
			</Thead>
			<Tbody>
				{offerings.map((offering) => (
					<Tr
						key={offering.id}
						cursor="pointer"
						_hover={{ backgroundColor: "gray.100" }}
					>
						<Td fontWeight={"semibold"}>{offering.paperType.name}</Td>
						<Td>{offering.language.name}</Td>
						<Td isNumeric>{offering.expectedTimeInHours} Hrs</Td>
						<Td isNumeric>{formatInr(offering.price)}</Td>
						<Td isNumeric onClick={(e) => e.stopPropagation()}>
							<EditIconButton
								onClick={() => {
									// setSelectedOfferingForUpdate(offering)
									// setIsDrawerOpen(true)
								}}
							/>
							<DeleteIconButton
								onClick={() => {
									// setSelectedOfferingForDelete(offering)
									// setIsDeleteDialogOpen(true)
								}}
							/>
						</Td>
					</Tr>
				))}
			</Tbody>
		</Table>
	)
}
