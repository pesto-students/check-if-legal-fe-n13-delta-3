import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { FC, useEffect } from "react"
import { CenteredSpinner } from "../../../components/ui/CenterSpinner"
import { DeleteIconButton } from "../../../components/ui/DeleteIconButton"
import { EditIconButton } from "../../../components/ui/EditIconButton"
import { useLanguageDeleteStore } from "./languageDelete/useLanguageDeleteStore"
import { useLanguageStore } from "../../language/useLanguageStore"
import { useLanguageUpdateStore } from "./languageUpdate/useLanguageUpdateStore"

export const LanguageListView: FC = () => {
	const { languages, isLanguagesLoading, fetchLanguages } = useLanguageStore()
	const { setSelectedLanguage: setSelectedLanguageForDelete, setIsDeleteDialogOpen } =
		useLanguageDeleteStore()
	const { setSelectedLanguage: setSelectedLanguageForUpdate, setIsDrawerOpen } =
		useLanguageUpdateStore()

	useEffect(() => {
		fetchLanguages()
	}, [fetchLanguages])

	if (isLanguagesLoading || !languages) return <CenteredSpinner />

	return (
		<Table size="sm" fontSize={"lg"}>
			<Thead>
				<Tr>
					<Th>Name</Th>
					<Th></Th>
				</Tr>
			</Thead>
			<Tbody>
				{languages.map((language) => (
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
