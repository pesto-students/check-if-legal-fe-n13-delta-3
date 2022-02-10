import create from "zustand"
import { ILanguage } from "../../../language/ILanguage"

interface IStoreState {
	selectedLanguage?: ILanguage
	setSelectedLanguage: (language: ILanguage) => void
	isDrawerOpen: boolean
	setIsDrawerOpen: (isOpen: boolean) => void
}

export const useLanguageUpdateStore = create<IStoreState>((set) => {
	return {
		setSelectedLanguage: (language: ILanguage) => set({ selectedLanguage: language }),
		isDrawerOpen: false,
		setIsDrawerOpen: (isOpen: boolean) => set({ isDrawerOpen: isOpen }),
	}
})
