import create from "zustand"
import { IPaperType } from "../../../paperType/IPaperType"

interface IStoreState {
	selectedPaperType?: IPaperType
	setSelectedPaperType: (paperType: IPaperType) => void
	isDrawerOpen: boolean
	setIsDrawerOpen: (isOpen: boolean) => void
}

export const usePaperTypeUpdateStore = create<IStoreState>((set) => {
	return {
		setSelectedPaperType: (paperType: IPaperType) =>
			set({ selectedPaperType: paperType }),
		isDrawerOpen: false,
		setIsDrawerOpen: (isOpen: boolean) => set({ isDrawerOpen: isOpen }),
	}
})
