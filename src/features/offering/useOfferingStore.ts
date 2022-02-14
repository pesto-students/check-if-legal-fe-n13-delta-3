import create from "zustand"
import { getErrorMessage } from "../../utils/helpers"
import { IUserOffering } from "./IUserOffering"
import { userOfferingListApi } from "./userOfferingListApi"

interface IStoreState {
	paperTypeId?: number
	setPaperTypeId: (paperTypeId: number) => void
	languageId?: number
	setLanguageId: (languageId: number) => void
	cityId?: number
	setCityId: (cityId: number) => void
	offerings?: IUserOffering[]
	isOfferingLoading: boolean
	fetchOfferingsError?: string
	fetchOfferings: (payload: { token?: string }) => void
}

export const useOfferingStore = create<IStoreState>((set, get) => {
	return {
		setCityId: (cityId: number) => set(() => ({ cityId })),
		setLanguageId: (languageId: number) => set(() => ({ languageId })),
		setPaperTypeId: (paperTypeId: number) => set(() => ({ paperTypeId })),

		isOfferingLoading: false,
		fetchOfferings: ({ token }: { token?: string }) => {
			const { paperTypeId, languageId, cityId } = get()
			const isOfferingFilterFilled = paperTypeId && languageId && cityId

			if (isOfferingFilterFilled) {
				set({ isOfferingLoading: true })
				set({ fetchOfferingsError: undefined })

				userOfferingListApi({ token, cityId, languageId, paperTypeId })
					.then((offerings) => set({ offerings }))
					.catch((err) => set({ fetchOfferingsError: getErrorMessage(err) }))
					.finally(() => set({ isOfferingLoading: false }))
			}
		},
	}
})
