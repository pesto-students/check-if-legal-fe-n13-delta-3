import { useCallback } from "react"
import { useQuery, useQueryClient } from "react-query"
import { IReview } from "./IReview"
import { apiReviewList } from "./reviewList.api"
import { apiReviewListCountGet } from "./reviewListCountGet.api"

interface IDataShape {
	reviews: IReview[]
	countReviews: number
}

function getQueryKey(page: number) {
	return ["reviews", page]
}

export function useReviewListQuery({ token, pageNo }: { token: string; pageNo: number }) {
	return useQuery<IDataShape, Error>(getQueryKey(pageNo), async () => {
		const [reviews, countReviews] = await Promise.all([
			apiReviewList({ token, pageNo }),
			apiReviewListCountGet({ token }),
		])
		return { reviews, countReviews }
	})
}

export function useReviewListData({ pageNo }: { pageNo: number }) {
	const queryClient = useQueryClient()
	const queryKey = getQueryKey(pageNo)

	const data = queryClient.getQueryData<IDataShape>(queryKey)
	const state = queryClient.getQueryState<IDataShape>(queryKey)
	const refetch = useCallback(
		() => queryClient.refetchQueries(queryKey),
		[queryClient, queryKey],
	)

	return { data, state, refetch }
}
