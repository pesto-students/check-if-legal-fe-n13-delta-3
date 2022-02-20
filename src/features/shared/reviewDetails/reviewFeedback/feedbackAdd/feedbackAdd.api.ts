import { HttpApi, HttpMethod } from "../../../../../core/http"

export async function apiReviewFeedbackAdd({
	reviewId,
	description,
	token,
}: {
	reviewId: number
	description: string
	token: string
}) {
	const httpApi = new HttpApi<{ id: number }>(
		HttpMethod.POST,
		`/review/${reviewId}/feedback`,
	)
	await httpApi.send({ body: { description }, token })
}
