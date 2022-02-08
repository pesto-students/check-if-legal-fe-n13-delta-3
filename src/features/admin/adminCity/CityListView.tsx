import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { FC } from "react"
import { DeleteIconButton } from "../../../components/ui/DeleteIconButton"
import { EditIconButton } from "../../../components/ui/EditIconButton"
import { ICity } from "../../city/ICity"

interface IProps {
	cities: ICity[]
	onUpdate?: (city: ICity) => void
	onDelete?: (city: ICity) => void
	onSelect?: (city: ICity) => void
}

export const CityListView: FC<IProps> = ({ cities, onSelect, onUpdate, onDelete }) => (
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
					onClick={() => onSelect && onSelect(city)}
				>
					<Td fontWeight={"semibold"}>{city.name}</Td>
					<Td>{city.state.name}</Td>
					<Td isNumeric onClick={(e) => e.stopPropagation()}>
						<EditIconButton onClick={() => onUpdate && onUpdate(city)} />
						<DeleteIconButton onClick={() => onDelete && onDelete(city)} />
					</Td>
				</Tr>
			))}
		</Tbody>
	</Table>
)
