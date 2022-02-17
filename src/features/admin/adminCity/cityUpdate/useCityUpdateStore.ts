import create from "zustand"
import { ICity } from "../../../shared/city/ICity"

interface IStoreState {
	selectedCity?: ICity
	setSelectedCity: (city: ICity) => void
	isDrawerOpen: boolean
	setIsDrawerOpen: (isOpen: boolean) => void
}

export const useCityUpdateStore = create<IStoreState>((set) => {
	return {
		setSelectedCity: (city: ICity) => set({ selectedCity: city }),
		isDrawerOpen: false,
		setIsDrawerOpen: (isOpen: boolean) => set({ isDrawerOpen: isOpen }),
	}
})
