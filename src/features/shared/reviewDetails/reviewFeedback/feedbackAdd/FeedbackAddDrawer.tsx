import { FormControl, Stack, Textarea } from "@chakra-ui/react"
import { FC } from "react"
import { useForm } from "react-hook-form"
import { getErrorMessage } from "../../../../../utils/helpers"
import { storage } from "../../../../../utils/storage"
import { DrawerForm } from "../../../components/ui/DrawerForm"
import { InputLabel } from "../../../components/ui/InputLabel"
import { useErrorToast } from "../../../hooks/useErrorToast"
import { useSuccessToast } from "../../../hooks/useSuccessToast"
import { useReviewDetailsData } from "../../reviewDetails.query"
import { apiReviewFeedbackAdd } from "./feedbackAdd.api"

interface IFormData {
	description: string
}

interface IProps {
	reviewId: number
	isOpen: boolean
	onClose: () => void
}

export const FeedbackAddDrawer: FC<IProps> = ({ reviewId, isOpen, onClose }) => {
	const auth = storage.getAuth()
	const token = auth?.token

	const errorToast = useErrorToast()
	const successToast = useSuccessToast()

	const { refetch } = useReviewDetailsData({ reviewId })
	const { register, handleSubmit, formState, reset } = useForm<IFormData>({
		defaultValues: { description: "" },
	})

	const onSubmit = handleSubmit(async (data) => {
		if (!token) return
		try {
			await apiReviewFeedbackAdd({ ...data, reviewId, token })
			successToast("Review feedback added successfully")
			refetch()
			onClose()
			reset()
		} catch (err) {
			errorToast(getErrorMessage(err))
		}
	})

	return (
		<DrawerForm
			size={"sm"}
			headingText="Add Feedback"
			onSubmit={onSubmit}
			isSubmitting={formState.isSubmitting}
			submitLabel={"Save"}
			onClose={onClose}
			isOpen={isOpen}
		>
			<Stack maxWidth={"sm"} marginX={"auto"}>
				<FormControl>
					<InputLabel label="Feedback Message" />
					<Textarea autoFocus maxLength={1000} {...register("description")} />
				</FormControl>
			</Stack>
		</DrawerForm>
	)
}
