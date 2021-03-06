import { HttpApi, HttpMethod } from "../../../../core/http"

export async function apiReviewNoteUpdate(
	{ reviewId, userNote }: { reviewId: number; userNote?: string },
	token: string,
) {
	const httpApi = new HttpApi(HttpMethod.PATCH, `/review/${reviewId}`)
	await httpApi.send({ body: { userNote }, token })
}
