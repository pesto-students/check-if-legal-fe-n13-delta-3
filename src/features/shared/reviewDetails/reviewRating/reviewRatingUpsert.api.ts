import { HttpApi, HttpMethod } from "../../../../core/http"

export async function apiReviewRatingUpsert(
	{ reviewId, rating, comment }: { reviewId: number; rating: number; comment: string },
	token: string,
) {
	const httpApi = new HttpApi(HttpMethod.PUT, `/review/${reviewId}/rating`)
	await httpApi.send({ body: { rating, comment }, token })
}
