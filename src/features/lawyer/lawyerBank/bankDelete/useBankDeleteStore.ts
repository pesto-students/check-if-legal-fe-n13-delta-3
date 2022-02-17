import create from "zustand"
import { IBank } from "../IBank"

interface IStoreState {
	selectedBank?: IBank
	setSelectedBank: (bank: IBank) => void
	isDeleteDialogOpen: boolean
	setIsDeleteDialogOpen: (isDeleteDialogOpen: boolean) => void
}

export const useBankDeleteStore = create<IStoreState>((set) => {
	return {
		setSelectedBank: (bank: IBank) => set({ selectedBank: bank }),
		isDeleteDialogOpen: false,
		setIsDeleteDialogOpen: (isDeleteDialogOpen: boolean) => set({ isDeleteDialogOpen }),
	}
})
