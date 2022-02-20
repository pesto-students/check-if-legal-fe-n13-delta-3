import { FormControl, Stack, Textarea } from "@chakra-ui/react"
import { FC } from "react"
import { useForm } from "react-hook-form"
import { useUserAuth } from "../../../../user/useUserAuth"
import { DrawerForm } from "../../../components/ui/DrawerForm"
import { InputLabel } from "../../../components/ui/InputLabel"
import { useErrorToast } from "../../../hooks/useErrorToast"
import { useSuccessToast } from "../../../hooks/useSuccessToast"
import { apiReviewFeedbackAdd } from "./feedbackAdd.api"
import { useReviewDetailsData } from "../../reviewDetails.query"

interface IFormData {
	description: string
}

interface IProps {
	reviewId: number
	isOpen: boolean
	onClose: () => void
}

export const FeedbackAddDrawer: FC<IProps> = ({ reviewId, isOpen, onClose }) => {
	const { token } = useUserAuth()
	const errorToast = useErrorToast()
	const successToast = useSuccessToast()

	const { refetch } = useReviewDetailsData({ reviewId })
	const { register, handleSubmit, formState, reset } = useForm<IFormData>({
		defaultValues: { description: "" },
	})

	const onSubmit = handleSubmit((data) => {
		apiReviewFeedbackAdd({ ...data, reviewId, token })
			.then(() => {
				successToast("Review feedback added successfully")
				refetch()
				onClose()
				reset()
			})
			.catch((err) => errorToast(err))
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
