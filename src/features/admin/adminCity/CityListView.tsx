import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { FC, useEffect } from "react"
import { CenteredSpinner } from "../../../components/ui/CenterSpinner"
import { DeleteIconButton } from "../../../components/ui/DeleteIconButton"
import { EditIconButton } from "../../../components/ui/EditIconButton"
import { useCityDeleteStore } from "./stores/useCityDeleteStore"
import { useCityStore } from "./stores/useCityStore"

export const CityListView: FC = () => {
	const { cities, isCitiesLoading, fetchCities } = useCityStore()
	const { setSelectedCity, setIsDeleteDialogOpen } = useCityDeleteStore()

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
							<EditIconButton onClick={() => {}} />
							<DeleteIconButton
								onClick={() => {
									setSelectedCity(city)
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
