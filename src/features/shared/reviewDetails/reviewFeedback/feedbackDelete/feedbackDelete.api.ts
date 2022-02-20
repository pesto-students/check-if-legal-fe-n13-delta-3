import { HttpApi, HttpMethod } from "../../../../../core/http"

export async function apiFeedbackDelete(
	{ id, reviewId }: { id: number; reviewId: number },
	token: string,
) {
	const httpApi = new HttpApi(HttpMethod.DELETE, `/review/${reviewId}/feedback/${id}`)
	await httpApi.send({ token })
}
