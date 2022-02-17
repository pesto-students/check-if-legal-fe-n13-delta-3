import { Box, Button, Heading, Text, useDisclosure } from "@chakra-ui/react"
import { FC, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getErrorMessage } from "../../../../utils/helpers"
import { useVerifiedLawyerAuth } from "../../../lawyer/useVerifiedLawyerAuth"
import { Dialog } from "../../components/ui/Dialog"
import { ReviewStatus } from "../../review/IReview"
import { useReviewDetailsStore } from "../useReviewDetailsStore"
import { reviewCloseApi } from "./reviewCloseApi"

export const ReviewClose: FC = () => {
	const navigate = useNavigate()
	const { token } = useVerifiedLawyerAuth()
	const { isLawyer, review } = useReviewDetailsStore()
	const [isLoading, setIsLoading] = useState(false)
	const [errorText, setErrorText] = useState<string>()

	const disclosure = useDisclosure()

	if (!isLawyer || !review) return null

	const isClosable = review.status === ReviewStatus.PENDING_FOR_REVIEW
	if (!isClosable) return null

	const handleClose = () => {
		setIsLoading(true)
		setErrorText(undefined)

		reviewCloseApi({ id: review.id, token })
			.then(() => {
				disclosure.onClose()
				navigate("/lawyer/review")
			})
			.catch((err) => setErrorText(getErrorMessage(err)))
			.finally(() => setIsLoading(false))
	}

	return (
		<Box>
			<Heading size={"md"}>Review Closing</Heading>
			<Text maxW={"md"}>
				This will mark review as completed and payout will be initiated
			</Text>
			<Button
				mt={1}
				size={"sm"}
				colorScheme={"blue"}
				onClick={() => disclosure.onOpen()}
			>
				Close Review
			</Button>
			<Dialog
				{...disclosure}
				title="Close Review"
				approveText="Yes, Close"
				approveButtonColorScheme={"blue"}
				onCancel={() => disclosure.onClose()}
				onApprove={handleClose}
				isLoading={isLoading}
				errorMessage={errorText}
			></Dialog>
		</Box>
	)
}
