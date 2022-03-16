import { FC, useCallback, useState } from "react"
import { getErrorMessage } from "../../../../utils/helpers"
import DeleteItemDialog from "../../../shared/components/ui/DeleteItemDialog"
import { useErrorToast } from "../../../shared/hooks/useErrorToast"
import { usePaperTypeListData } from "../../../shared/paperType/paperTypeList.query"
import { useAdminAuth } from "../../useAdminAuth"
import { paperTypeDeleteApi } from "./paperTypeDeleteApi"
import { usePaperTypeDeleteStore } from "./usePaperTypeDeleteStore"

export const PaperTypeDeleteDialog: FC = () => {
	const { token } = useAdminAuth()
	const [isLoading, setIsLoading] = useState(false)
	const errorToast = useErrorToast()

	const { refetch: refetchPaperTypes } = usePaperTypeListData()
	const { selectedPaperType, isDeleteDialogOpen, setIsDeleteDialogOpen } =
		usePaperTypeDeleteStore()

	const handlePaperTypeDelete = useCallback(() => {
		if (!selectedPaperType) return
		setIsLoading(true)
		paperTypeDeleteApi({ id: selectedPaperType.id }, token)
			.then(() => {
				setIsDeleteDialogOpen(false)
				refetchPaperTypes()
			})
			.catch((error) => errorToast(getErrorMessage(error)))
			.finally(() => setIsLoading(false))
	}, [
		selectedPaperType,
		setIsLoading,
		setIsDeleteDialogOpen,
		refetchPaperTypes,
		token,
		errorToast,
	])

	if (!selectedPaperType) return null

	return (
		<DeleteItemDialog
			title={`Delete Paper Type: ${selectedPaperType.name}`}
			isOpen={isDeleteDialogOpen}
			onCancel={() => setIsDeleteDialogOpen(false)}
			onDelete={handlePaperTypeDelete}
			isLoading={isLoading}
		/>
	)
}
