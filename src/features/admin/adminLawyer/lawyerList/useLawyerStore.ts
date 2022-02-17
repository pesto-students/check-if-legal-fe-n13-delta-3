import create from "zustand"
import { getErrorMessage } from "../../../../utils/helpers"
import { ILawyer } from "../../../lawyer/ILawyer"
import { lawyerListApi } from "./lawyerListApi"

interface IStoreState {
	lawyers?: ILawyer[]
	fetchLawyersError?: string
	isLawyersLoading: boolean
	fetchLawyers: (payload: { token: string }) => void
}

export const useLawyerStore = create<IStoreState>((set) => {
	return {
		isLawyersLoading: false,
		fetchLawyers: (payload: { token: string }) => {
			set({ isLawyersLoading: true })
			set({ fetchLawyersError: undefined })

			lawyerListApi(payload)
				.then((lawyers) => set({ lawyers }))
				.catch((err) => set({ fetchLawyersError: getErrorMessage(err) }))
				.finally(() => set({ isLawyersLoading: false }))
		},
	}
})
