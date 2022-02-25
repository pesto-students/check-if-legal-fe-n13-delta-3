import { useCallback } from "react"
import { useQuery, useQueryClient } from "react-query"
import { IRating } from "./IRating"
import { apiRatingList } from "./ratingList.api"
import { apiRatingListCountGet } from "./ratingListCountGet.api"

interface IDataShape {
	ratings: IRating[]
	countRatings: number
}

function getQueryKey(page: number) {
	return ["ratings", page]
}

export function useRatingListQuery({
	token,
	pageNo,
	limit,
}: {
	token: string
	pageNo: number
	limit: number
}) {
	return useQuery<IDataShape, Error>(getQueryKey(pageNo), async () => {
		const [ratings, countRatings] = await Promise.all([
			apiRatingList({ token, pageNo, limit }),
			apiRatingListCountGet({ token }),
		])
		return { ratings, countRatings }
	})
}

export function useRatingListData({ pageNo }: { pageNo: number }) {
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
