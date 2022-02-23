import { useCallback } from "react"
import { useQuery, useQueryClient } from "react-query"
import { ILawyer } from "./ILawyer"
import { apiLawyerSelfGet } from "./lawyerSelfGet.api"

type IDataShape = ILawyer | null
const queryKey = "lawyer"

export function useLawyerQuery({ token }: { token: string }) {
	return useQuery<IDataShape, Error>(queryKey, () => apiLawyerSelfGet({ token }))
}

export function useLawyerData() {
	const queryClient = useQueryClient()

	const data = queryClient.getQueryData<IDataShape>(queryKey)
	const state = queryClient.getQueryState<IDataShape>(queryKey)
	const refetch = useCallback(() => queryClient.refetchQueries(queryKey), [queryClient])

	return { data, state, refetch }
}
