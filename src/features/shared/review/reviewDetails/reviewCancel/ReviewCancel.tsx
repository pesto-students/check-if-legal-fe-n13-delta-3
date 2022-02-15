import { Button } from "@chakra-ui/react"
import { FC } from "react"
import { ReviewStatus } from "../../IReview"
import { useReviewDetailsStore } from "../useReviewDetailsStore"

export const ReviewCancel: FC = () => {
	const { isLawyer, review } = useReviewDetailsStore()
	if (isLawyer || !review) return null

	const isNotCancellable = [
		ReviewStatus.IN_REVIEW,
		ReviewStatus.PENDING_FOR_REVIEW,
		ReviewStatus.CLOSED,
	].includes(review.status)

	if (isNotCancellable) return null

	return (
		<Button size={"sm"} colorScheme={"red"}>
			Cancel Review
		</Button>
	)
}
