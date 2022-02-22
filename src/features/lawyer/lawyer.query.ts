import { useCallback } from "react"
import { useQuery, useQueryClient } from "react-query"
import { storage } from "../../utils/storage"
import { ILawyer } from "./ILawyer"
import { apiLawyerSelfGet } from "./lawyerSelfGet.api"

type IDataShape = ILawyer | null
const queryKey = "lawyer"

export function useLawyerQuery({ token }: { token: string }) {
	const auth = storage.getAuth()

	return useQuery<IDataShape, Error>(queryKey, async () => {
		if (!auth) return null

		const isVerified = auth.isVerified
		const lawyer = await apiLawyerSelfGet({ token })

		if (lawyer && !isVerified !== lawyer.isVerified) {
			storage.setIsVerified(lawyer.isVerified)
		}
		return lawyer
	})
}

export function useLawyerData() {
	const queryClient = useQueryClient()

	const data = queryClient.getQueryData<IDataShape>(queryKey)
	const state = queryClient.getQueryState<IDataShape>(queryKey)
	const refetch = useCallback(() => queryClient.refetchQueries(queryKey), [queryClient])

	return { data, state, refetch }
}
