import { IReview } from "../review/IReview"

export interface IRating {
	id: number
	createdAt: string
	updatedAt: string
	reviewId: number
	comment: string | null
	rating: number
	review: IReview
}
