import create from "zustand"
import { getErrorMessage } from "../../../utils/helpers"
import { IBank } from "./IBank"
import { bankListApi } from "./bankListApi"

interface IStoreState {
	banks?: IBank[]
	fetchBanksError?: string
	isBanksLoading: boolean
	fetchBanks: (payload: { token: string }) => void
}

export const useLawyerBankStore = create<IStoreState>((set) => {
	return {
		isBanksLoading: false,
		fetchBanks: ({ token }) => {
			set({ isBanksLoading: true })
			set({ fetchBanksError: undefined })

			bankListApi({ token })
				.then((banks) => set({ banks }))
				.catch((err) => set({ fetchBanksError: getErrorMessage(err) }))
				.finally(() => set({ isBanksLoading: false }))
		},
	}
})
