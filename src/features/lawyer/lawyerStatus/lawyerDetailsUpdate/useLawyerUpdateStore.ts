import create from "zustand"

interface IStoreState {
	isDrawerOpen: boolean
	setIsDrawerOpen: (isOpen: boolean) => void
}

export const useLawyerUpdateStore = create<IStoreState>((set) => {
	return {
		isDrawerOpen: false,
		setIsDrawerOpen: (isOpen: boolean) => set({ isDrawerOpen: isOpen }),
	}
})
