import create from "zustand"
import { getErrorMessage } from "../../utils/helpers"
import { IState } from "./IState"
import { stateListApi } from "./stateListApi"

interface IStoreState {
	states?: IState[]
	fetchStatesError?: string
	isStatesLoading: boolean
	fetchStates: () => void
}

export const useStateStore = create<IStoreState>((set) => {
	return {
		isStatesLoading: false,
		fetchStates: () => {
			set({ isStatesLoading: true })
			set({ fetchStatesError: undefined })

			stateListApi()
				.then((states) => set({ states }))
				.catch((err) => set({ fetchStatesError: getErrorMessage(err) }))
				.finally(() => set({ isStatesLoading: false }))
		},
	}
})
