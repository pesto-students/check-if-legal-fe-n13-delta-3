import { HttpApi, HttpMethod } from "../../../../core/http"

export async function apiReviewDocumentList({
	reviewId,
	token,
}: {
	reviewId: number
	token: string
}) {
	const httpApi = new HttpApi<string[]>(HttpMethod.GET, `/review/${reviewId}/document`)
	return await httpApi.send({ token })
}
