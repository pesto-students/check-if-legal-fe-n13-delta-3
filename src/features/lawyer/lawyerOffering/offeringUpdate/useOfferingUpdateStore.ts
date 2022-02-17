import create from "zustand"
import { IOffering } from "../IOffering"

interface IStoreState {
	selectedOffering?: IOffering
	setSelectedOffering: (offering: IOffering) => void
	isDrawerOpen: boolean
	setIsDrawerOpen: (isOpen: boolean) => void
}

export const useOfferingUpdateStore = create<IStoreState>((set) => {
	return {
		setSelectedOffering: (offering: IOffering) => set({ selectedOffering: offering }),
		isDrawerOpen: false,
		setIsDrawerOpen: (isOpen: boolean) => set({ isDrawerOpen: isOpen }),
	}
})
