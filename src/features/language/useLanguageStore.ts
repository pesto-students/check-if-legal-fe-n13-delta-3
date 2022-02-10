import create from "zustand"
import { getErrorMessage } from "../../utils/helpers"
import { languageListApi } from "./languageListApi"
import { ILanguage } from "./ILanguage"

interface IStoreState {
	languages?: ILanguage[]
	fetchLanguagesError?: string
	isLanguagesLoading: boolean
	fetchLanguages: () => void
}

export const useLanguageStore = create<IStoreState>((set) => {
	return {
		isLanguagesLoading: false,
		fetchLanguages: () => {
			set({ isLanguagesLoading: true })
			set({ fetchLanguagesError: undefined })

			languageListApi()
				.then((languages) => set({ languages }))
				.catch((err) => set({ fetchLanguagesError: getErrorMessage(err) }))
				.finally(() => set({ isLanguagesLoading: false }))
		},
	}
})
