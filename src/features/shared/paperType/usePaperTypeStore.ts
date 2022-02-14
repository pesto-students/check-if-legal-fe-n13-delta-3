import create from "zustand"
import { getErrorMessage } from "../../../utils/helpers"
import { paperTypeListApi } from "./paperTypeListApi"
import { IPaperType } from "./IPaperType"

interface IStoreState {
	paperTypes?: IPaperType[]
	fetchPaperTypesError?: string
	isPaperTypesLoading: boolean
	fetchPaperTypes: () => void
}

export const usePaperTypeStore = create<IStoreState>((set) => {
	return {
		isPaperTypesLoading: false,
		fetchPaperTypes: () => {
			set({ isPaperTypesLoading: true })
			set({ fetchPaperTypesError: undefined })

			paperTypeListApi()
				.then((paperTypes) => set({ paperTypes }))
				.catch((err) => set({ fetchPaperTypesError: getErrorMessage(err) }))
				.finally(() => set({ isPaperTypesLoading: false }))
		},
	}
})
