export interface IReviewRating {
	id: number
	createdAt: string
	updatedAt: string
	reviewId: number
	comment: string | null
	rating: number
}
