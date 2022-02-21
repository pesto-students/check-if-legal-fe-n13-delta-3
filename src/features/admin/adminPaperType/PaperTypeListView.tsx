import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { FC, useEffect } from "react"
import { CenteredSpinner } from "../../shared/components/ui/CenterSpinner"
import { DeleteIconButton } from "../../shared/components/ui/DeleteIconButton"
import { EditIconButton } from "../../shared/components/ui/EditIconButton"
import { usePaperTypeListQuery } from "../../shared/paperType/paperTypeList.query"
import { usePaperTypeDeleteStore } from "./paperTypeDelete/usePaperTypeDeleteStore"
import { usePaperTypeUpdateStore } from "./paperTypeUpdate/usePaperTypeUpdateStore"

export const PaperTypeListView: FC = () => {
	const {
		data: paperTypes,
		isLoading: isPaperTypesLoading,
		refetch: refetchPaperTypes,
	} = usePaperTypeListQuery()
	const { setSelectedPaperType: setSelectedPaperTypeForDelete, setIsDeleteDialogOpen } =
		usePaperTypeDeleteStore()
	const { setSelectedPaperType: setSelectedPaperTypeForUpdate, setIsDrawerOpen } =
		usePaperTypeUpdateStore()

	useEffect(() => {
		refetchPaperTypes()
	}, [refetchPaperTypes])

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
