import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { FC } from "react"
import { ICity } from "../../city/ICity"

interface IProps {
	cities: ICity[]
}

export const CityListView: FC<IProps> = ({ cities }) => (
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
				<Tr key={city.id} cursor="pointer" _hover={{ backgroundColor: "gray.100" }}>
					<Td fontWeight={"semibold"}>{city.name}</Td>
					<Td>{city.state.name}</Td>
					<Td isNumeric onClick={(e) => e.stopPropagation()}></Td>
				</Tr>
			))}
		</Tbody>
	</Table>
)
