import { useCallback } from "react"
import { useQuery, useQueryClient } from "react-query"
import { IPaperType } from "./IPaperType"
import { apiPaperTypeList } from "./paperTypeList.api"

type IDataShape = IPaperType[]
const queryKey = "paperTypes"

export function usePaperTypeListQuery() {
	return useQuery<IDataShape, Error>(queryKey, apiPaperTypeList)
}

export function usePaperTypeListData() {
	const queryClient = useQueryClient()

	const data = queryClient.getQueryData<IDataShape>(queryKey)
	const state = queryClient.getQueryState<IDataShape>(queryKey)
	const refetch = useCallback(() => queryClient.refetchQueries(queryKey), [queryClient])

	return { data, state, refetch }
}
