import create from "zustand"
import { getErrorMessage } from "../../../../utils/helpers"
import { IReviewPayment } from "./IReviewPayment"
import { reviewPaymentGetApi } from "./reviewPaymentGetApi"

interface IStoreState {
	payment?: IReviewPayment | null
	isPaymentLoading: boolean
	fetchPaymentError?: string
	fetchPayment: (payload: { reviewId: number; token: string }, cb?: () => void) => void
}

export const useReviewPaymentStore = create<IStoreState>((set) => {
	return {
		isPaymentLoading: false,
		fetchPayment: ({ reviewId, token }, cb) => {
			set({ isPaymentLoading: true })
			set({ fetchPaymentError: undefined })

			reviewPaymentGetApi({ reviewId, token })
				.then((payment) => set({ payment }))
				.catch((err) => set({ fetchPaymentError: getErrorMessage(err) }))
				.finally(() => {
					set({ isPaymentLoading: false })
					cb && cb()
				})
		},
	}
})
