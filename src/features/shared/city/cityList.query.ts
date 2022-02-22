import { useCallback } from "react"
import { useQuery, useQueryClient } from "react-query"
import { apiCityList } from "./cityList.api"
import { ICity } from "./ICity"

type IDataShape = ICity[]
const queryKey = "cities"

export function useCityListQuery() {
	return useQuery<IDataShape, Error>(queryKey, apiCityList)
}

export function useCityListData() {
	const queryClient = useQueryClient()

	const data = queryClient.getQueryData<IDataShape>(queryKey)
	const state = queryClient.getQueryState<IDataShape>(queryKey)
	const refetch = useCallback(() => queryClient.refetchQueries(queryKey), [queryClient])

	return { data, state, refetch }
}
