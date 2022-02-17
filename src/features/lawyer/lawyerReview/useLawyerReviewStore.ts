import create from "zustand"
import { getErrorMessage } from "../../../utils/helpers"
import { reviewListApi } from "../../shared/review/reviewListApi"
import { IReview } from "../../shared/review/IReview"

interface IStoreState {
	reviews?: IReview[]
	fetchReviewsError?: string
	isReviewsLoading: boolean
	fetchReviews: (payload: { token: string }) => void
}

export const useLawyerReviewStore = create<IStoreState>((set) => {
	return {
		isReviewsLoading: false,
		fetchReviews: ({ token }) => {
			set({ isReviewsLoading: true })
			set({ fetchReviewsError: undefined })

			reviewListApi({ token })
				.then((reviews) => set({ reviews }))
				.catch((err) => set({ fetchReviewsError: getErrorMessage(err) }))
				.finally(() => set({ isReviewsLoading: false }))
		},
	}
})
