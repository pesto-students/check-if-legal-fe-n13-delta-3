import { useCallback } from "react"
import { useQuery, useQueryClient } from "react-query"
import { apiLawyerSelfProofList } from "./apis/lawyerSelfProofList.api"

type IDataShape = string[]
const queryKey = "lawyerProof"

export function useLawyerProofQuery({ token }: { token: string }) {
	return useQuery<IDataShape, Error>(queryKey, () => apiLawyerSelfProofList({ token }))
}

export function useLawyerProofData() {
	const queryClient = useQueryClient()

	const data = queryClient.getQueryData<IDataShape>(queryKey)
	const state = queryClient.getQueryState<IDataShape>(queryKey)
	const refetch = useCallback(() => queryClient.refetchQueries(queryKey), [queryClient])

	return { data, state, refetch }
}
