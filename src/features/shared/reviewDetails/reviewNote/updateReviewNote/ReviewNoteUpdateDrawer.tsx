import { FormControl, Stack, Textarea } from "@chakra-ui/react"
import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import { useUserAuth } from "../../../../user/useUserAuth"
import { DrawerForm } from "../../../components/ui/DrawerForm"
import { ErrorText } from "../../../components/ui/ErrorText"
import { InputLabel } from "../../../components/ui/InputLabel"
import { useReviewDetailsStore } from "../../useReviewDetailsStore"
import { reviewNoteUpdateApi } from "./reviewNoteUpdateApi"
import { useReviewNoteUpdateStore } from "./useReviewNoteUpdateStore"

interface IFormData {
	userNote: string
}

export const ReviewNoteUpdateDrawer: FC = () => {
	const { token } = useUserAuth()
	const { review, fetchReview } = useReviewDetailsStore()
	const { isDrawerOpen, setIsDrawerOpen } = useReviewNoteUpdateStore()

	const [errorText, setErrorText] = useState<string>()
	const { register, handleSubmit, formState, reset } = useForm<IFormData>({
		defaultValues: { userNote: review?.userNote ?? "" },
	})

	if (!review) return null

	const onDrawerClose = () => {
		setIsDrawerOpen(false)
		reset()
		setErrorText(undefined)
	}

	const onSubmit = handleSubmit((data) => {
		reviewNoteUpdateApi({ ...data, reviewId: review.id }, token)
			.then(() => {
				onDrawerClose()
				fetchReview({ id: review.id, token })
			})
			.catch((err) =>
				setErrorText(err instanceof Error ? err.message : "Unknown Error"),
			)
	})

	return (
		<DrawerForm
			size={"sm"}
			headingText="Update Review Note"
			onSubmit={onSubmit}
			isSubmitting={formState.isSubmitting}
			submitLabel={"Save"}
			onClose={onDrawerClose}
			isOpen={isDrawerOpen}
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

				{errorText && <ErrorText text={errorText} />}
			</Stack>
		</DrawerForm>
	)
}
