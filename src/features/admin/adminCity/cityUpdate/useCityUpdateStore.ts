import create from "zustand"
import { ICity } from "../../../city/ICity"

interface IStoreState {
	selectedCity?: ICity
	setSelectedCity: (city: ICity) => void
	isDrawerOpen: boolean
	setIsDrawerOpen: (isOpen: boolean) => void
}

export const useCityUpdateStore = create<IStoreState>((set) => {
	return {
		setSelectedCity: (city: ICity) => set({ selectedCity: city }),
		isDeleteDialogOpen: false,
		isDrawerOpen: false,
		setIsDrawerOpen: (isOpen: boolean) => set({ isDrawerOpen: isOpen }),
	}
})
