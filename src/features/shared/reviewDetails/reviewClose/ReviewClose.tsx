import { Box, Button, Heading, Text, useDisclosure } from "@chakra-ui/react"
import { ComponentProps, FC, useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getErrorMessage } from "../../../../utils/helpers"
import { useVerifiedLawyerAuth } from "../../../lawyer/useVerifiedLawyerAuth"
import { Dialog } from "../../components/ui/Dialog"
import { useErrorToast } from "../../hooks/useErrorToast"
import { useSuccessToast } from "../../hooks/useSuccessToast"
import { ReviewStatus } from "../../review/IReview"
import { apiReviewClose } from "./reviewClose.api"
import { useReviewDetailsData } from "../reviewDetails.query"

interface IProps extends ComponentProps<typeof Box> {
	reviewId: number
}

export const ReviewClose: FC<IProps> = ({ reviewId, ...rest }) => {
	const navigate = useNavigate()
	const { token } = useVerifiedLawyerAuth()

	const [isLoading, setIsLoading] = useState(false)
	const errorToast = useErrorToast()
	const successToast = useSuccessToast()
	const disclosure = useDisclosure()

	const { data } = useReviewDetailsData({ reviewId })
	const review = data?.review

	const handleClose = useCallback(() => {
		setIsLoading(true)

		apiReviewClose({ id: reviewId, token })
			.then(() => {
				disclosure.onClose()
				successToast("Review marked as completed successfully")
				navigate("/lawyer/review")
			})
			.catch((err) => errorToast(getErrorMessage(err)))
			.finally(() => setIsLoading(false))
	}, [disclosure, navigate, reviewId, token, errorToast, successToast])

	if (!review) return null

	const isClosable = review.status === ReviewStatus.PENDING_FOR_REVIEW
	if (!isClosable) return null

	return (
		<Box {...rest}>
			<Heading size={"md"}>Review Closing</Heading>
			<Text maxW={"md"}>
				This will mark review as completed and payout will be initiated.
			</Text>
			<Button
				mt={1}
				size={"sm"}
				colorScheme={"blue"}
				onClick={() => disclosure.onOpen()}
			>
				Mark Review as Completed
			</Button>
			<Dialog
				{...disclosure}
				title="Mark Review as Completed"
				approveText="Yes, Complete It"
				approveButtonColorScheme={"blue"}
				onCancel={disclosure.onClose}
				onApprove={handleClose}
				isLoading={isLoading}
			></Dialog>
		</Box>
	)
}
