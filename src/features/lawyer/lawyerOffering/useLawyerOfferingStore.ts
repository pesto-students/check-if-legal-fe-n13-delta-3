import create from "zustand"
import { getErrorMessage } from "../../../utils/helpers"
import { IOffering } from "./IOffering"
import { offeringListApi } from "./offeringListApi"

interface IStoreState {
	offerings?: IOffering[]
	fetchOfferingsError?: string
	isOfferingsLoading: boolean
	fetchOfferings: (payload: { token: string }) => void
}

export const useLawyerOfferingStore = create<IStoreState>((set) => {
	return {
		isOfferingsLoading: false,
		fetchOfferings: ({ token }) => {
			set({ isOfferingsLoading: true })
			set({ fetchOfferingsError: undefined })

			offeringListApi({ token })
				.then((offerings) => set({ offerings }))
				.catch((err) => set({ fetchOfferingsError: getErrorMessage(err) }))
				.finally(() => set({ isOfferingsLoading: false }))
		},
	}
})
