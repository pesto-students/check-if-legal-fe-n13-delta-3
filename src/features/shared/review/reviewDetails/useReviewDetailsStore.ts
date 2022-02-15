import create from "zustand"
import { getErrorMessage } from "../../../../utils/helpers"
import { IReview } from "../IReview"
import { reviewDocumentListApi } from "../reviewDocumentListApi"
import { reviewGetApi } from "../reviewGetApi"

interface IStoreState {
	review?: IReview
	documents?: string[]
	fetchReviewError?: string
	isReviewLoading: boolean
	fetchReview: (payload: { id: number; token: string }) => void
}

export const useReviewDetailsStore = create<IStoreState>((set) => {
	return {
		isReviewLoading: false,
		fetchReview: ({ id, token }) => {
			set({ isReviewLoading: true })
			set({ fetchReviewError: undefined })

			reviewGetApi({ id, token })
				.then((review) => {
					set({ review })
					return reviewDocumentListApi({ reviewId: id, token }).then((documents) =>
						set({ documents }),
					)
				})
				.catch((err) => set({ fetchReviewError: getErrorMessage(err) }))
				.finally(() => set({ isReviewLoading: false }))
		},
	}
})
