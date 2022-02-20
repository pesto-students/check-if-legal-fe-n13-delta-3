import { FC, useCallback, useState } from "react"
import { getErrorMessage } from "../../../../../utils/helpers"
import { storage } from "../../../../../utils/storage"
import DeleteItemDialog from "../../../components/ui/DeleteItemDialog"
import { useErrorToast } from "../../../hooks/useErrorToast"
import { useSuccessToast } from "../../../hooks/useSuccessToast"
import { useReviewDetailsData } from "../../reviewDetails.query"
import { IReviewFeedback } from "../IReviewFeedback"
import { apiFeedbackDelete } from "./feedbackDelete.api"

interface IProps {
	reviewId: number
	selectedFeedback: IReviewFeedback
	isOpen: boolean
	onClose: () => void
}

export const FeedbackDeleteDialog: FC<IProps> = ({
	reviewId,
	selectedFeedback,
	isOpen,
	onClose,
}) => {
	const auth = storage.getAuth()
	const token = auth?.token

	const [isLoading, setIsLoading] = useState(false)
	const errorToast = useErrorToast()
	const successToast = useSuccessToast()
	const { refetch } = useReviewDetailsData({ reviewId })

	const onDelete = useCallback(() => {
		if (!token) throw new Error("Invalid auth")

		setIsLoading(true)
		apiFeedbackDelete({ reviewId, id: selectedFeedback.id }, token)
			.then(() => {
				onClose()
				successToast("Feedback deleted successfully")
				refetch()
			})
			.catch((error) => errorToast(getErrorMessage(error)))
			.finally(() => setIsLoading(false))
	}, [errorToast, refetch, selectedFeedback, successToast, token, reviewId, onClose])

	return (
		<DeleteItemDialog
			title={`Delete Feedback`}
			isOpen={isOpen}
			onCancel={onClose}
			onDelete={onDelete}
			isLoading={isLoading}
		/>
	)
}
