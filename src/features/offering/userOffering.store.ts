import create from "zustand"
import { ICity } from "../shared/city/ICity"
import { ILanguage } from "../shared/language/ILanguage"
import { IPaperType } from "../shared/paperType/IPaperType"

interface IStoreState {
	paperType?: IPaperType
	setPaperType: (paperType: IPaperType) => void
	language?: ILanguage
	setLanguage: (language: ILanguage) => void
	city?: ICity
	setCity: (city: ICity) => void
}

export const useUserOfferingStore = create<IStoreState>((set) => {
	return {
		setCity: (city) => set(() => ({ city })),
		setLanguage: (language) => set(() => ({ language })),
		setPaperType: (paperType) => set(() => ({ paperType })),
	}
})
