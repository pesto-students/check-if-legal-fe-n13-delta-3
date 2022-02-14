import { FC, useState } from "react"
import DeleteItemDialog from "../../../shared/components/ui/DeleteItemDialog"
import { getErrorMessage } from "../../../../utils/helpers"
import { useAdminAuth } from "../../useAdminAuth"
import { usePaperTypeDeleteStore } from "./usePaperTypeDeleteStore"
import { usePaperTypeStore } from "../../../shared/paperType/usePaperTypeStore"
import { paperTypeDeleteApi } from "./paperTypeDeleteApi"

export const PaperTypeDeleteDialog: FC = () => {
	const { token } = useAdminAuth()

	const fetchPaperTypes = usePaperTypeStore((state) => state.fetchPaperTypes)
	const { selectedPaperType, isDeleteDialogOpen, setIsDeleteDialogOpen } =
		usePaperTypeDeleteStore()

	const [isLoading, setIsLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState<string>()

	if (!selectedPaperType) return null

	const handlePaperTypeDelete = () => {
		setIsLoading(true)
		paperTypeDeleteApi({ id: selectedPaperType.id }, token)
			.then(() => {
				setIsDeleteDialogOpen(false)
				fetchPaperTypes()
			})
			.catch((error) => setErrorMessage(getErrorMessage(error)))
			.finally(() => setIsLoading(false))
	}

	if (!selectedPaperType) return null

	return (
		<DeleteItemDialog
			title={`Delete Paper Type: ${selectedPaperType.name}`}
			isOpen={isDeleteDialogOpen}
			onCancel={() => {
				setIsDeleteDialogOpen(false)
				setErrorMessage(undefined)
			}}
			onDelete={handlePaperTypeDelete}
			isLoading={isLoading}
			errorMessage={errorMessage}
		/>
	)
}
