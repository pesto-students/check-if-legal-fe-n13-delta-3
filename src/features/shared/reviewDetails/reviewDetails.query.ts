import { useCallback } from "react"
import { useQuery, useQueryClient } from "react-query"
import { IReview } from "../review/IReview"
import { apiReviewFeedbackList } from "./apis/feedbackList.api"
import { apiReviewDocumentList } from "./apis/reviewDocumentList.api"
import { apiReviewGet } from "./apis/reviewGet.api"
import { apiReviewPaymentGet } from "./apis/reviewPaymentGet.api"
import { apiReviewRatingGet } from "./apis/reviewRatingGet.api"
import { IReviewFeedback } from "./reviewFeedback/IReviewFeedback"
import { IReviewPayment } from "./reviewPayment/IReviewPayment"
import { IReviewRating } from "./reviewRating/IReviewRating"

interface IDataShape {
	review: IReview
	documentList: string[]
	payment: IReviewPayment | null
	feedbackList: IReviewFeedback[]
	rating: IReviewRating | null
}

function getQueryKey(reviewId: number): [string, number] {
	return ["review", reviewId]
}

export function useReviewDetailsQuery({
	reviewId,
	isLawyer,
	token,
}: {
	reviewId: number
	isLawyer: boolean
	token: string
}) {
	return useQuery<IDataShape, Error>(
		getQueryKey(reviewId),
		async () => {
			let payment: IReviewPayment | null = null
			if (!isLawyer) {
				payment = await apiReviewPaymentGet({ reviewId, token })
			}

			const [review, documentList, feedbackList, rating] = await Promise.all([
				apiReviewGet({ id: reviewId, token }),
				apiReviewDocumentList({ reviewId, token }),
				apiReviewFeedbackList({ reviewId, token }),
				apiReviewRatingGet({ reviewId, token }),
			])

			return { review, documentList, payment, feedbackList, rating }
		},
		{ cacheTime: 0 },
	)
}

export function useReviewDetailsData({ reviewId }: { reviewId: number }) {
	const queryClient = useQueryClient()
	const queryKey = getQueryKey(reviewId)

	const data = queryClient.getQueryData<IDataShape>(queryKey)
	const state = queryClient.getQueryState<IDataShape>(queryKey)
	const refetch = useCallback(() => {
		queryClient.invalidateQueries(queryKey)
	}, [queryClient, queryKey])

	return { data, state, refetch }
}
