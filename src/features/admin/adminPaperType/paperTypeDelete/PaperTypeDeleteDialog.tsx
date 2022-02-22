import { FC, useState } from "react"
import { getErrorMessage } from "../../../../utils/helpers"
import DeleteItemDialog from "../../../shared/components/ui/DeleteItemDialog"
import { usePaperTypeListData } from "../../../shared/paperType/paperTypeList.query"
import { useAdminAuth } from "../../useAdminAuth"
import { paperTypeDeleteApi } from "./paperTypeDeleteApi"
import { usePaperTypeDeleteStore } from "./usePaperTypeDeleteStore"

export const PaperTypeDeleteDialog: FC = () => {
	const { token } = useAdminAuth()

	const { refetch: refetchPaperTypes } = usePaperTypeListData()
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
				refetchPaperTypes()
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
