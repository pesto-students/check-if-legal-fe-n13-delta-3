import { useCallback } from "react"
import { useQuery, useQueryClient } from "react-query"
import { IReview } from "../review/IReview"
import { apiReviewDocumentList } from "./apis/apiReviewDocumentList"
import { apiReviewGet } from "./apis/apiReviewGet"
import { apiReviewPaymentGet } from "./apis/reviewPaymentGet.api"
import { apiReviewFeedbackList } from "./reviewFeedback/feedbackList/feedbackList.api"
import { IReviewFeedback } from "./reviewFeedback/IReviewFeedback"
import { IReviewPayment } from "./reviewPayment/IReviewPayment"

interface IDataShape {
	review: IReview
	documentList: string[]
	payment?: IReviewPayment | null
	feedbackList?: IReviewFeedback[]
}

function getQueryKey(reviewId: number) {
	return ["review", reviewId]
}

export function useReviewDetailsQuery({
	reviewId,
	token,
}: {
	reviewId: number
	token: string
}) {
	return useQuery<IDataShape, Error>(getQueryKey(reviewId), async () => {
		const payment = await apiReviewPaymentGet({ reviewId, token })
		const [review, documentList, feedbackList] = await Promise.all([
			apiReviewGet({ id: reviewId, token }),
			apiReviewDocumentList({ reviewId, token }),
			apiReviewFeedbackList({ reviewId, token }),
		])

		return { review, documentList, payment, feedbackList }
	})
}

export function useReviewDetailsData({ reviewId }: { reviewId: number }) {
	const queryClient = useQueryClient()
	const queryKey = getQueryKey(reviewId)

	const data = queryClient.getQueryData<IDataShape>(queryKey)

	const refetch = useCallback(() => {
		queryClient.refetchQueries(queryKey)
	}, [queryClient, queryKey])

	return { data, refetch }
}
