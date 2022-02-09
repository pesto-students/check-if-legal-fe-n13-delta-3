import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { FC, useEffect } from "react"
import { CenteredSpinner } from "../../../components/ui/CenterSpinner"
import { DeleteIconButton } from "../../../components/ui/DeleteIconButton"
import { EditIconButton } from "../../../components/ui/EditIconButton"
import { usePaperTypeDeleteStore } from "./paperTypeDelete/usePaperTypeDeleteStore"
import { usePaperTypeStore } from "../../paperType/usePaperTypeStore"
import { usePaperTypeUpdateStore } from "./paperTypeUpdate/usePaperTypeUpdateStore"

export const PaperTypeListView: FC = () => {
	const { paperTypes, isPaperTypesLoading, fetchPaperTypes } = usePaperTypeStore()
	const { setSelectedPaperType: setSelectedPaperTypeForDelete, setIsDeleteDialogOpen } =
		usePaperTypeDeleteStore()
	const { setSelectedPaperType: setSelectedPaperTypeForUpdate, setIsDrawerOpen } =
		usePaperTypeUpdateStore()

	useEffect(() => {
		fetchPaperTypes()
	}, [fetchPaperTypes])

	if (isPaperTypesLoading || !paperTypes) return <CenteredSpinner />

	return (
		<Table size="sm" fontSize={"lg"}>
			<Thead>
				<Tr>
					<Th>Name</Th>
					<Th></Th>
				</Tr>
			</Thead>
			<Tbody>
				{paperTypes.map((paperType) => (
					<Tr
						key={paperType.id}
						cursor="pointer"
						_hover={{ backgroundColor: "gray.100" }}
					>
						<Td fontWeight={"semibold"}>{paperType.name}</Td>
						<Td isNumeric onClick={(e) => e.stopPropagation()}>
							<EditIconButton
								onClick={() => {
									setSelectedPaperTypeForUpdate(paperType)
									setIsDrawerOpen(true)
								}}
							/>
							<DeleteIconButton
								onClick={() => {
									setSelectedPaperTypeForDelete(paperType)
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
