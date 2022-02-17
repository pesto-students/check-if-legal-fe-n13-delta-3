import create from "zustand"
import { IOffering } from "../IOffering"

interface IStoreState {
	selectedOffering?: IOffering
	setSelectedOffering: (offering: IOffering) => void
	isDeleteDialogOpen: boolean
	setIsDeleteDialogOpen: (isDeleteDialogOpen: boolean) => void
}

export const useOfferingDeleteStore = create<IStoreState>((set) => {
	return {
		setSelectedOffering: (offering: IOffering) => set({ selectedOffering: offering }),
		isDeleteDialogOpen: false,
		setIsDeleteDialogOpen: (isDeleteDialogOpen: boolean) => set({ isDeleteDialogOpen }),
	}
})
