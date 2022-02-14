import create from "zustand"
import { ILanguage } from "../../../shared/language/ILanguage"

interface IStoreState {
	selectedLanguage?: ILanguage
	setSelectedLanguage: (language: ILanguage) => void
	isDeleteDialogOpen: boolean
	setIsDeleteDialogOpen: (isDeleteDialogOpen: boolean) => void
}

export const useLanguageDeleteStore = create<IStoreState>((set) => {
	return {
		setSelectedLanguage: (language: ILanguage) => set({ selectedLanguage: language }),
		isDeleteDialogOpen: false,
		setIsDeleteDialogOpen: (isDeleteDialogOpen: boolean) => set({ isDeleteDialogOpen }),
	}
})
