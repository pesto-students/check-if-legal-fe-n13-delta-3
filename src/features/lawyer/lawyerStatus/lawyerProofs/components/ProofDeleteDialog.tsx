import { FC, useCallback, useState } from "react"
import { getErrorMessage } from "../../../../../utils/helpers"
import DeleteItemDialog from "../../../../shared/components/ui/DeleteItemDialog"
import { useErrorToast } from "../../../../shared/hooks/useErrorToast"
import { useSuccessToast } from "../../../../shared/hooks/useSuccessToast"
import { useLawyerAuth } from "../../../useLawyerAuth"
import { apiLawyerSelfProofDelete } from "../apis/lawyerSelfProofDelete.api"
import { useLawyerProofData } from "../lawyerProof.query"

interface IProps {
	fileName: string
	isOpen: boolean
	onClose: () => void
}

export const ProofDeleteDialog: FC<IProps> = ({ fileName, isOpen, onClose }) => {
	const { token } = useLawyerAuth()
	const { refetch } = useLawyerProofData()

	const [isLoading, setIsLoading] = useState(false)
	const errorToast = useErrorToast()
	const successToast = useSuccessToast()

	const onDelete = useCallback(() => {
		setIsLoading(true)

		apiLawyerSelfProofDelete({ fileName, token })
			.then(() => {
				successToast("Documents deleted successfully")
				onClose()
				refetch()
			})
			.catch((err) => errorToast(getErrorMessage(err)))
			.finally(() => setIsLoading(false))
	}, [token, errorToast, successToast, fileName, onClose, refetch])

	return (
		<DeleteItemDialog
			title={`Delete File: ${fileName}`}
			onCancel={onClose}
			onDelete={onDelete}
			isLoading={isLoading}
			isOpen={isOpen}
		/>
	)
}
