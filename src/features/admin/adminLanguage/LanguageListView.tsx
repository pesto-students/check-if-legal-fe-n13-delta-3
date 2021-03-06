import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { FC } from "react"
import { CenteredSpinner } from "../../shared/components/ui/CenterSpinner"
import { DeleteIconButton } from "../../shared/components/ui/DeleteIconButton"
import { EditIconButton } from "../../shared/components/ui/EditIconButton"
import { useLanguageListQuery } from "../../shared/language/languageList.query"
import { useLanguageDeleteStore } from "./languageDelete/useLanguageDeleteStore"
import { useLanguageUpdateStore } from "./languageUpdate/useLanguageUpdateStore"

export const LanguageListView: FC = () => {
	const { data: languages, isLoading } = useLanguageListQuery()

	const { setSelectedLanguage: setSelectedLanguageForDelete, setIsDeleteDialogOpen } =
		useLanguageDeleteStore()
	const { setSelectedLanguage: setSelectedLanguageForUpdate, setIsDrawerOpen } =
		useLanguageUpdateStore()

	if (isLoading) return <CenteredSpinner />

	return (
		<Table size="sm" fontSize={"lg"}>
			<Thead>
				<Tr>
					<Th>Name</Th>
					<Th></Th>
				</Tr>
			</Thead>
			<Tbody>
				{languages?.map((language) => (
					<Tr
						key={language.id}
						cursor="pointer"
						_hover={{ backgroundColor: "gray.100" }}
					>
						<Td fontWeight={"semibold"}>{language.name}</Td>
						<Td isNumeric onClick={(e) => e.stopPropagation()}>
							<EditIconButton
								onClick={() => {
									setSelectedLanguageForUpdate(language)
									setIsDrawerOpen(true)
								}}
							/>
							<DeleteIconButton
								onClick={() => {
									setSelectedLanguageForDelete(language)
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
