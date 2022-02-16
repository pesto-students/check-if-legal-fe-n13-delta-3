import create from "zustand"
import { getErrorMessage } from "../../utils/helpers"
import { ILawyer } from "./ILawyer"
import { lawyerSelfGetApi } from "./lawyerSelfGetApi"

interface IStoreState {
	lawyer?: ILawyer | null
	fetchLawyerError?: string
	isLawyerLoading: boolean
	fetchLawyer: (payload: { token: string }) => void
}

export const useLawyerStore = create<IStoreState>((set) => {
	return {
		isLawyerLoading: false,
		fetchLawyer: ({ token }) => {
			set({ isLawyerLoading: true })
			set({ fetchLawyerError: undefined })

			lawyerSelfGetApi({ token })
				.then((lawyer) => set({ lawyer }))
				.catch((err) => set({ fetchLawyerError: getErrorMessage(err) }))
				.finally(() => set({ isLawyerLoading: false }))
		},
	}
})
