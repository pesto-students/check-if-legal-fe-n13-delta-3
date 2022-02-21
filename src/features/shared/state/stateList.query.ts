import { useCallback } from "react"
import { useQuery, useQueryClient } from "react-query"
import { IState } from "./IState"
import { apiStateList } from "./stateList.api"

type IDataShape = IState[]
const queryKey = "states"

export function useStateListQuery() {
	return useQuery<IDataShape, Error>(queryKey, apiStateList)
}

export function useStateListData() {
	const queryClient = useQueryClient()

	const data = queryClient.getQueryData<IDataShape>(queryKey)
	const state = queryClient.getQueryState<IDataShape>(queryKey)
	const refetch = useCallback(() => queryClient.refetchQueries(queryKey), [queryClient])

	return { data, state, refetch }
}
