import { FC, useState } from "react"
import DeleteItemDialog from "../../../../components/ui/DeleteItemDialog"
import { getErrorMessage } from "../../../../utils/helpers"
import { useAdminAuth } from "../../useAdminAuth"
import { useLanguageDeleteStore } from "./useLanguageDeleteStore"
import { useLanguageStore } from "../../../language/useLanguageStore"
import { languageDeleteApi } from "./languageDeleteApi"

export const LanguageDeleteDialog: FC = () => {
	const { token } = useAdminAuth()

	const fetchLanguages = useLanguageStore((state) => state.fetchLanguages)
	const { selectedLanguage, isDeleteDialogOpen, setIsDeleteDialogOpen } =
		useLanguageDeleteStore()

	const [isLoading, setIsLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState<string>()

	if (!selectedLanguage) return null

	const handleLanguageDelete = () => {
		setIsLoading(true)
		languageDeleteApi({ id: selectedLanguage.id }, token)
			.then(() => {
				setIsDeleteDialogOpen(false)
				fetchLanguages()
			})
			.catch((error) => setErrorMessage(getErrorMessage(error)))
			.finally(() => setIsLoading(false))
	}

	if (!selectedLanguage) return null

	return (
		<DeleteItemDialog
			title={`Delete Language: ${selectedLanguage.name}`}
			isOpen={isDeleteDialogOpen}
			onCancel={() => {
				setIsDeleteDialogOpen(false)
				setErrorMessage(undefined)
			}}
			onDelete={handleLanguageDelete}
			isLoading={isLoading}
			errorMessage={errorMessage}
		/>
	)
}
