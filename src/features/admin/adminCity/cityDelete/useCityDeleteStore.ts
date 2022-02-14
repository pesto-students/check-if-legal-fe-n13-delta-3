import create from "zustand"
import { ICity } from "../../../shared/city/ICity"

interface IStoreState {
	selectedCity?: ICity
	setSelectedCity: (city: ICity) => void
	isDeleteDialogOpen: boolean
	setIsDeleteDialogOpen: (isDeleteDialogOpen: boolean) => void
}

export const useCityDeleteStore = create<IStoreState>((set) => {
	return {
		setSelectedCity: (city: ICity) => set({ selectedCity: city }),
		isDeleteDialogOpen: false,
		setIsDeleteDialogOpen: (isDeleteDialogOpen: boolean) => set({ isDeleteDialogOpen }),
	}
})
