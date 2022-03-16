import { FormControl, Stack, Textarea } from "@chakra-ui/react"
import { FC } from "react"
import { useForm } from "react-hook-form"
import { getErrorMessage } from "../../../../utils/helpers"
import { useUserAuth } from "../../../user/useUserAuth"
import { DrawerForm } from "../../components/ui/DrawerForm"
import { InputLabel } from "../../components/ui/InputLabel"
import { useErrorToast } from "../../hooks/useErrorToast"
import { useSuccessToast } from "../../hooks/useSuccessToast"
import { useReviewDetailsData } from "../reviewDetails.query"
import { apiReviewNoteUpdate } from "./reviewNoteUpdate.api"

interface IFormData {
	userNote: string
}

interface IProps {
	reviewId: number
	isOpen: boolean
	onClose: () => void
}

export const ReviewNoteUpdateDrawer: FC<IProps> = ({ reviewId, isOpen, onClose }) => {
	const { token } = useUserAuth()
	const errorToast = useErrorToast()
	const successToast = useSuccessToast()

	const { data, refetch } = useReviewDetailsData({ reviewId })
	const review = data?.review

	const { register, handleSubmit, formState } = useForm<IFormData>({
		defaultValues: { userNote: review?.userNote ?? "" },
	})

	const onSubmit = handleSubmit(async (data) => {
		try {
			await apiReviewNoteUpdate({ ...data, reviewId }, token)
			successToast("Review note updated successfully")
			refetch()
			onClose()
		} catch (err) {
			errorToast(getErrorMessage(err))
		}
	})

	if (!review) return null

	return (
		<DrawerForm
			size={"sm"}
			headingText="Update Review Note"
			onSubmit={onSubmit}
			isSubmitting={formState.isSubmitting}
			submitLabel={"Save"}
			onClose={onClose}
			isOpen={isOpen}
		>
			<Stack maxWidth={"sm"} marginX={"auto"}>
				{/* Note */}
				<FormControl>
					<InputLabel label="User Note" />
					<Textarea
						autoFocus
						defaultValue={review?.userNote ?? ""}
						{...register("userNote")}
					/>
				</FormControl>
			</Stack>
		</DrawerForm>
	)
}
