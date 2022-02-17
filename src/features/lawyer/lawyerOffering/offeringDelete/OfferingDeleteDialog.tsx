import { FC, useState } from "react"
import DeleteItemDialog from "../../../shared/components/ui/DeleteItemDialog"
import { getErrorMessage } from "../../../../utils/helpers"
import { offeringDeleteApi } from "./offeringDeleteApi"
import { useVerifiedLawyerAuth } from "../../useVerifiedLawyerAuth"
import { useLawyerOfferingStore } from "../useLawyerOfferingStore"
import { useOfferingDeleteStore } from "./useCityDeleteStore"

export const OfferingDeleteDialog: FC = () => {
	const { token } = useVerifiedLawyerAuth()

	const { fetchOfferings } = useLawyerOfferingStore()
	const { selectedOffering, isDeleteDialogOpen, setIsDeleteDialogOpen } =
		useOfferingDeleteStore()

	const [isLoading, setIsLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState<string>()

	if (!selectedOffering) return null

	const handleOfferingDelete = () => {
		setIsLoading(true)
		offeringDeleteApi({ id: selectedOffering.id }, token)
			.then(() => {
				setIsDeleteDialogOpen(false)
				fetchOfferings({ token })
			})
			.catch((error) => setErrorMessage(getErrorMessage(error)))
			.finally(() => setIsLoading(false))
	}

	if (!selectedOffering) return null

	return (
		<DeleteItemDialog
			title={`Delete Offering`}
			isOpen={isDeleteDialogOpen}
			onCancel={() => {
				setIsDeleteDialogOpen(false)
				setErrorMessage(undefined)
			}}
			onDelete={handleOfferingDelete}
			isLoading={isLoading}
			errorMessage={errorMessage}
		/>
	)
}
