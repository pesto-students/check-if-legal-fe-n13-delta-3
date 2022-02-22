import { useCallback } from "react"
import { useQuery, useQueryClient } from "react-query"
import { IBank } from "./IBank"
import { apiLawyerBankGet } from "./lawyerBankGet.api"

type IDataShape = IBank | null
const queryKey = "bank"

export function useLawyerBankQuery({ token }: { token: string }) {
	return useQuery<IDataShape, Error>(queryKey, () => apiLawyerBankGet({ token }))
}

export function useLawyerBankData() {
	const queryClient = useQueryClient()

	const data = queryClient.getQueryData<IDataShape>(queryKey)
	const state = queryClient.getQueryState<IDataShape>(queryKey)
	const refetch = useCallback(() => queryClient.refetchQueries(queryKey), [queryClient])

	return { data, state, refetch }
}
