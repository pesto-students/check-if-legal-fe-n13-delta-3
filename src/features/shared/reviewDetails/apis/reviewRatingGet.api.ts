import { HttpApi, HttpMethod } from "../../../../core/http"
import { IReviewRating } from "../reviewRating/IReviewRating"

export async function apiReviewRatingGet({
	reviewId,
	token,
}: {
	reviewId: number
	token: string
}) {
	const httpApi = new HttpApi<IReviewRating | null>(
		HttpMethod.GET,
		`/review/${reviewId}/rating`,
	)
	const rating = await httpApi.send({ token })
	return rating || null
}
