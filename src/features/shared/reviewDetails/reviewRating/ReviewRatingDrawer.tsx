import { FormControl, Stack, Textarea } from "@chakra-ui/react"
import { FC, useEffect } from "react"
import { useForm } from "react-hook-form"
import { AiFillStar, AiOutlineStar } from "react-icons/ai"
import ReactRating from "react-rating"
import { useUserAuth } from "../../../user/useUserAuth"
import { DrawerForm } from "../../components/ui/DrawerForm"
import { InputLabel } from "../../components/ui/InputLabel"
import { useErrorToast } from "../../hooks/useErrorToast"
import { useSuccessToast } from "../../hooks/useSuccessToast"
import { useReviewDetailsQuery } from "../reviewDetails.query"
import { apiReviewRatingUpsert } from "./reviewRatingUpsert.api"

interface IFormData {
	rating: number
	comment: string
}

interface IProps {
	reviewId: number
	isOpen: boolean
	isLawyer: boolean
	onClose: () => void
}

export const ReviewRatingDrawer: FC<IProps> = ({
	reviewId,
	isLawyer,
	isOpen,
	onClose,
}) => {
	const { token } = useUserAuth()
	const errorToast = useErrorToast()
	const successToast = useSuccessToast()

	const { data, refetch, isError, error } = useReviewDetailsQuery({
		reviewId,
		isLawyer,
		token,
	})
	const rating = data?.rating

	const { register, handleSubmit, formState, setValue } = useForm<IFormData>()

	useEffect(() => {
		if (rating) {
			setValue("rating", rating.rating)
			setValue("comment", rating.comment ?? "")
		}
	})

	const onSubmit = handleSubmit((data) => {
		apiReviewRatingUpsert({ ...data, reviewId }, token)
			.then(() => {
				successToast("Rating updated successfully")
				refetch()
				onClose()
			})
			.catch((err) => errorToast(err))
	})

	if (isError) return <p>{error}</p>

	return (
		<DrawerForm
			size={"sm"}
			headingText="Review Rating"
			onSubmit={onSubmit}
			isSubmitting={formState.isSubmitting}
			submitLabel={"Save"}
			onClose={onClose}
			isOpen={isOpen}
		>
			<Stack maxWidth={"sm"} marginX={"auto"}>
				<InputLabel label="Rating" />
				<ReactRating
					initialRating={rating?.rating ?? 0}
					onChange={(value) => setValue("rating", value)}
					emptySymbol={<AiOutlineStar size={"2em"} color="#f59e0b" />}
					fullSymbol={<AiFillStar size={"2em"} color="#f59e0b" />}
				/>

				{/* Comment */}
				<FormControl>
					<InputLabel label="Comment" />
					<Textarea
						autoFocus
						defaultValue={rating?.comment ?? ""}
						{...register("comment")}
					/>
				</FormControl>
			</Stack>
		</DrawerForm>
	)
}
