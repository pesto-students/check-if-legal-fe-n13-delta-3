import { Box, Table, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react"
import { FC, useState } from "react"
import { useCityListQuery } from "../../shared/city/cityList.query"
import { ICity } from "../../shared/city/ICity"
import { CenteredSpinner } from "../../shared/components/ui/CenterSpinner"
import { DeleteIconButton } from "../../shared/components/ui/DeleteIconButton"
import { EditIconButton } from "../../shared/components/ui/EditIconButton"
import { CityDeleteDialog } from "./cityDelete/CityDeleteDialog"
import { CityUpdateDrawer } from "./cityUpdate/CityUpdateDrawer"

export const CityListView: FC = () => {
	const { data: cities, isLoading } = useCityListQuery()
	const [cityForDelete, setCityForDelete] = useState<ICity>()
	const [cityForUpdate, setCityForUpdate] = useState<ICity>()

	const updateDrawer = useDisclosure()
	const deleteDialog = useDisclosure()

	if (isLoading) return <CenteredSpinner />

	return (
		<Box>
			<Table size="sm" fontSize={"lg"}>
				<Thead>
					<Tr>
						<Th>Name</Th>
						<Th>State</Th>
						<Th></Th>
					</Tr>
				</Thead>
				<Tbody>
					{cities?.map((city) => (
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
										setCityForUpdate(city)
										updateDrawer.onOpen()
									}}
								/>
								<DeleteIconButton
									onClick={() => {
										setCityForDelete(city)
										deleteDialog.onOpen()
									}}
								/>
							</Td>
						</Tr>
					))}
				</Tbody>
			</Table>

			{cityForDelete && <CityDeleteDialog city={cityForDelete} {...deleteDialog} />}
			{cityForUpdate && <CityUpdateDrawer city={cityForUpdate} {...updateDrawer} />}
		</Box>
	)
}
