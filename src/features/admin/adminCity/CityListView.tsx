import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { FC, useEffect } from "react"
import { CenteredSpinner } from "../../shared/components/ui/CenterSpinner"
import { DeleteIconButton } from "../../shared/components/ui/DeleteIconButton"
import { EditIconButton } from "../../shared/components/ui/EditIconButton"
import { useCityDeleteStore } from "./cityDelete/useCityDeleteStore"
import { useCityStore } from "../../shared/city/useCityStore"
import { useCityUpdateStore } from "./cityUpdate/useCityUpdateStore"

export const CityListView: FC = () => {
	const { cities, isCitiesLoading, fetchCities } = useCityStore()
	const { setSelectedCity: setSelectedCityForDelete, setIsDeleteDialogOpen } =
		useCityDeleteStore()
	const { setSelectedCity: setSelectedCityForUpdate, setIsDrawerOpen } =
		useCityUpdateStore()

	useEffect(() => {
		fetchCities()
	}, [fetchCities])

	if (isCitiesLoading || !cities) return <CenteredSpinner />

	return (
		<Table size="sm" fontSize={"lg"}>
			<Thead>
				<Tr>
					<Th>Name</Th>
					<Th>State</Th>
					<Th></Th>
				</Tr>
			</Thead>
			<Tbody>
				{cities.map((city) => (
					<Tr
						key={city.id}
						cursor="pointer"
						_hover={{ backgroundColor: "gray.100" }}
					>
						<Td fontWeight={"semibold"}>{city.name}</Td>
						<Td>{city.state.name}</Td>
						<Td isNumeric onClick={(e) => e.stopPropagation()}>
							<EditIconButton
								onClick={() => {
									setSelectedCityForUpdate(city)
									setIsDrawerOpen(true)
								}}
							/>
							<DeleteIconButton
								onClick={() => {
									setSelectedCityForDelete(city)
									setIsDeleteDialogOpen(true)
								}}
							/>
						</Td>
					</Tr>
				))}
			</Tbody>
		</Table>
	)
}
