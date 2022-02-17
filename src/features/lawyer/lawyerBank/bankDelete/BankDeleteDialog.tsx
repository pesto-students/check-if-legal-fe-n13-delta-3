import { FC, useState } from "react"
import DeleteItemDialog from "../../../shared/components/ui/DeleteItemDialog"
import { getErrorMessage } from "../../../../utils/helpers"
import { bankDeleteApi } from "./bankDeleteApi"
import { useVerifiedLawyerAuth } from "../../useVerifiedLawyerAuth"
import { useLawyerBankStore } from "../useLawyerBankStore"
import { useBankDeleteStore } from "./useBankDeleteStore"

export const BankDeleteDialog: FC = () => {
	const { token } = useVerifiedLawyerAuth()

	const { fetchBanks } = useLawyerBankStore()
	const { selectedBank, isDeleteDialogOpen, setIsDeleteDialogOpen } =
		useBankDeleteStore()

	const [isLoading, setIsLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState<string>()

	if (!selectedBank) return null

	const handleBankDelete = () => {
		setIsLoading(true)
		bankDeleteApi({ id: selectedBank.id }, token)
			.then(() => {
				setIsDeleteDialogOpen(false)
				fetchBanks({ token })
			})
			.catch((error) => setErrorMessage(getErrorMessage(error)))
			.finally(() => setIsLoading(false))
	}

	if (!selectedBank) return null

	return (
		<DeleteItemDialog
			title={`Delete Bank: ${selectedBank.bankName}`}
			isOpen={isDeleteDialogOpen}
			onCancel={() => {
				setIsDeleteDialogOpen(false)
				setErrorMessage(undefined)
			}}
			onDelete={handleBankDelete}
			isLoading={isLoading}
			errorMessage={errorMessage}
		/>
	)
}
