import create from "zustand"
import { getErrorMessage } from "../../../../utils/helpers"
import { lawyerProofSelfListApi } from "./lawyerProofSelfListApi"

interface IStoreState {
	proofs?: string[]
	fetchProofsError?: string
	isProofsLoading: boolean
	fetchProofs: (payload: { token: string }) => void
}

export const useLawyerProofStore = create<IStoreState>((set) => {
	return {
		isProofsLoading: false,
		fetchProofs: ({ token }) => {
			set({ isProofsLoading: true })
			set({ fetchProofsError: undefined })

			lawyerProofSelfListApi({ token })
				.then((proofs) => set({ proofs }))
				.catch((err) => set({ fetchProofsError: getErrorMessage(err) }))
				.finally(() => set({ isProofsLoading: false }))
		},
	}
})
