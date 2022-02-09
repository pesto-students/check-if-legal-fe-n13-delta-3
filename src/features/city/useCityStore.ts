import create from "zustand"
import { getErrorMessage } from "../../utils/helpers"
import { cityListApi } from "./cityListApi"
import { ICity } from "./ICity"

interface IStoreState {
	cities?: ICity[]
	fetchCitiesError?: string
	isCitiesLoading: boolean
	fetchCities: () => void
}

export const useCityStore = create<IStoreState>((set) => {
	return {
		isCitiesLoading: false,
		fetchCities: () => {
			set({ isCitiesLoading: true })
			set({ fetchCitiesError: undefined })

			cityListApi()
				.then((cities) => set({ cities }))
				.catch((err) => set({ fetchCitiesError: getErrorMessage(err) }))
				.finally(() => set({ isCitiesLoading: false }))
		},
	}
})
