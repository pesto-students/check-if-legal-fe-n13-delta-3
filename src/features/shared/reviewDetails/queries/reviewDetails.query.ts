import { useCallback } from "react"
import { useQuery, useQueryClient } from "react-query"
import { IReview } from "../../review/IReview"
import { apiReviewDocumentList } from "../apis/apiReviewDocumentList"
import { apiReviewGet } from "../apis/apiReviewGet"
import { apiReviewPaymentGet } from "../apis/apiReviewPaymentGet"
import { IReviewPayment } from "../IReviewPayment"

interface IDataShape {
	review: IReview
	documentList: string[]
	payment?: IReviewPayment | null
}

export function useReviewDetailsQuery({
	reviewId,
	token,
}: {
	reviewId: number
	token: string
}) {
	return useQuery<IDataShape, Error>(["review", reviewId], async () => {
		const payment = await apiReviewPaymentGet({ reviewId, token })
		const [review, documentList] = await Promise.all([
			apiReviewGet({ id: reviewId, token }),
			apiReviewDocumentList({ reviewId, token }),
		])

		return { review, documentList, payment }
	})
}

export function useReviewDetailsData({ reviewId }: { reviewId: number }) {
	const queryClient = useQueryClient()
	const data = queryClient.getQueryData<IDataShape>(["review", reviewId])

	const refetch = useCallback(() => {
		queryClient.refetchQueries(["review", reviewId])
	}, [queryClient, reviewId])

	return { data, refetch }
}
