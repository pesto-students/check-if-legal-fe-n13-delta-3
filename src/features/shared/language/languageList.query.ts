import { useCallback } from "react"
import { useQuery, useQueryClient } from "react-query"
import { ILanguage } from "./ILanguage"
import { apiLanguageList } from "./languageList.api"

type IDataShape = ILanguage[]
const queryKey = "languages"

export function useLanguageListQuery() {
	return useQuery<IDataShape, Error>(queryKey, apiLanguageList)
}

export function useLanguageListData() {
	const queryClient = useQueryClient()

	const data = queryClient.getQueryData<IDataShape>(queryKey)
	const state = queryClient.getQueryState<IDataShape>(queryKey)
	const refetch = useCallback(() => queryClient.refetchQueries(queryKey), [queryClient])

	return { data, state, refetch }
}
