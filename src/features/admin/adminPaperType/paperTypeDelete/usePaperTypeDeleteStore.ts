import create from "zustand"
import { IPaperType } from "../../../shared/paperType/IPaperType"

interface IStoreState {
	selectedPaperType?: IPaperType
	setSelectedPaperType: (paperType: IPaperType) => void
	isDeleteDialogOpen: boolean
	setIsDeleteDialogOpen: (isDeleteDialogOpen: boolean) => void
}

export const usePaperTypeDeleteStore = create<IStoreState>((set) => {
	return {
		setSelectedPaperType: (paperType: IPaperType) =>
			set({ selectedPaperType: paperType }),
		isDeleteDialogOpen: false,
		setIsDeleteDialogOpen: (isDeleteDialogOpen: boolean) => set({ isDeleteDialogOpen }),
	}
})
