import { FC, useState } from "react"
import { getErrorMessage } from "../../../../utils/helpers"
import DeleteItemDialog from "../../../shared/components/ui/DeleteItemDialog"
import { useErrorToast } from "../../../shared/hooks/useErrorToast"
import { useLanguageListData } from "../../../shared/language/languageList.query"
import { useAdminAuth } from "../../useAdminAuth"
import { languageDeleteApi } from "./languageDeleteApi"
import { useLanguageDeleteStore } from "./useLanguageDeleteStore"

export const LanguageDeleteDialog: FC = () => {
	const { token } = useAdminAuth()

	const { refetch: refetchLanguages } = useLanguageListData()
	const { selectedLanguage, isDeleteDialogOpen, setIsDeleteDialogOpen } =
		useLanguageDeleteStore()

	const [isLoading, setIsLoading] = useState(false)
	const errorToast = useErrorToast()

	if (!selectedLanguage) return null

	const handleLanguageDelete = () => {
		setIsLoading(true)
		languageDeleteApi({ id: selectedLanguage.id }, token)
			.then(() => {
				setIsDeleteDialogOpen(false)
				refetchLanguages()
			})
			.catch((error) => errorToast(getErrorMessage(error)))
			.finally(() => setIsLoading(false))
	}

	if (!selectedLanguage) return null

	return (
		<DeleteItemDialog
			title={`Delete Language: ${selectedLanguage.name}`}
			isOpen={isDeleteDialogOpen}
			onCancel={() => {
				setIsDeleteDialogOpen(false)
			}}
			onDelete={handleLanguageDelete}
			isLoading={isLoading}
		/>
	)
}
