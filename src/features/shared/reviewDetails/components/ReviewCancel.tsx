import { Box, Button, Heading, Text, useDisclosure } from "@chakra-ui/react"
import { ComponentProps, FC, useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getErrorMessage } from "../../../../utils/helpers"
import { useUserAuth } from "../../../user/useUserAuth"
import { Dialog } from "../../components/ui/Dialog"
import { useErrorToast } from "../../hooks/useErrorToast"
import { useSuccessToast } from "../../hooks/useSuccessToast"
import { ReviewStatus } from "../../review/IReview"
import { apiReviewCancel } from "../apis/apiReviewCancel"
import { useReviewDetailsData } from "../queries/reviewDetails.query"

interface IProps extends ComponentProps<typeof Box> {
	reviewId: number
}

export const ReviewCancel: FC<IProps> = ({ reviewId, ...rest }) => {
	const navigate = useNavigate()
	const { token } = useUserAuth()

	const [isLoading, setIsLoading] = useState(false)
	const errorToast = useErrorToast()
	const successToast = useSuccessToast()
	const disclosure = useDisclosure()

	const { data } = useReviewDetailsData({ reviewId })
	const review = data?.review

	const handleOnCancel = useCallback(() => {
		setIsLoading(true)

		apiReviewCancel({ id: reviewId, token })
			.then(() => {
				disclosure.onClose()
				successToast("Review cancelled successfully")
				navigate("/user")
			})
			.catch((err) => errorToast(getErrorMessage(err)))
			.finally(() => setIsLoading(false))
	}, [disclosure, navigate, reviewId, token, errorToast, successToast])

	if (!review) return null

	const isNotCancellable = [
		ReviewStatus.PENDING_FOR_REVIEW,
		ReviewStatus.CLOSED,
	].includes(review.status)
	if (isNotCancellable) return null

	return (
		<Box {...rest}>
			<Heading size={"md"}>Review Cancellation</Heading>
			<Text maxW={"md"}>
				On cancellation of this review, all the related documents and data will
				erased. This action is irreversible.
			</Text>
			<Button mt={1} size={"sm"} colorScheme={"red"} onClick={disclosure.onOpen}>
				Cancel Review
			</Button>

			<Dialog
				{...disclosure}
				title="Cancel Review"
				approveText="Yes, Cancel"
				approveButtonColorScheme={"red"}
				onCancel={disclosure.onClose}
				onApprove={handleOnCancel}
				isLoading={isLoading}
			></Dialog>
		</Box>
	)
}
