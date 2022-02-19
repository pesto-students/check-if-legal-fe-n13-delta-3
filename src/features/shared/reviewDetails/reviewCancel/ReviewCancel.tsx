import { Box, Button, Heading, Text, useDisclosure } from "@chakra-ui/react"
import { FC, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getErrorMessage } from "../../../../utils/helpers"
import { useUserAuth } from "../../../user/useUserAuth"
import { Dialog } from "../../components/ui/Dialog"
import { ReviewStatus } from "../../review/IReview"
import { useReviewDetailsStore } from "../useReviewDetailsStore"
import { reviewCancelApi } from "./reviewCancelApi"

export const ReviewCancel: FC = () => {
	const navigate = useNavigate()
	const { token } = useUserAuth()
	const { isLawyer, review } = useReviewDetailsStore()
	const [isLoading, setIsLoading] = useState(false)
	const [errorText, setErrorText] = useState<string>()

	const disclosure = useDisclosure()

	if (isLawyer || !review) return null

	const isNotCancellable = [
		ReviewStatus.PENDING_FOR_REVIEW,
		ReviewStatus.CLOSED,
	].includes(review.status)
	if (isNotCancellable) return null

	const handleCancel = () => {
		setIsLoading(true)
		setErrorText(undefined)

		reviewCancelApi({ id: review.id, token })
			.then(() => {
				disclosure.onClose()
				navigate("/user")
			})
			.catch((err) => setErrorText(getErrorMessage(err)))
			.finally(() => setIsLoading(false))
	}

	return (
		<Box>
			<Heading size={"md"}>Review Cancellation</Heading>
			<Text maxW={"md"}>
				You will be taken to online payment gateway, once payment completes it will be
				sent for the review
			</Text>
			<Button
				mt={1}
				size={"sm"}
				colorScheme={"red"}
				onClick={() => disclosure.onOpen()}
			>
				Cancel Review
			</Button>
			<Dialog
				{...disclosure}
				title="Cancel Review"
				approveText="Yes, cancel"
				approveButtonColorScheme={"red"}
				onCancel={() => disclosure.onClose()}
				onApprove={handleCancel}
				isLoading={isLoading}
				errorMessage={errorText}
			></Dialog>
		</Box>
	)
}
