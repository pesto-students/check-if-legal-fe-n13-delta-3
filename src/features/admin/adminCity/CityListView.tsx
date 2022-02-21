import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { FC } from "react"
import { useCityListData } from "../../shared/city/cityList.query"
import { CenteredSpinner } from "../../shared/components/ui/CenterSpinner"
import { DeleteIconButton } from "../../shared/components/ui/DeleteIconButton"
import { EditIconButton } from "../../shared/components/ui/EditIconButton"
import { useCityDeleteStore } from "./cityDelete/useCityDeleteStore"
import { useCityUpdateStore } from "./cityUpdate/useCityUpdateStore"

export const CityListView: FC = () => {
	const citiesQuery = useCityListData()

	const { setSelectedCity: setSelectedCityForDelete, setIsDeleteDialogOpen } =
		useCityDeleteStore()
	const { setSelectedCity: setSelectedCityForUpdate, setIsDrawerOpen } =
		useCityUpdateStore()

	if (citiesQuery.state?.isFetching) return <CenteredSpinner />

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
				{citiesQuery.data?.map((city) => (
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
