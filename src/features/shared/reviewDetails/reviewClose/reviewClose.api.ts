import { HttpApi, HttpMethod } from "../../../../core/http"

export async function apiReviewClose({ id, token }: { id: number; token: string }) {
	const httpApi = new HttpApi(HttpMethod.POST, `/review/${id}/close`)
	await httpApi.send({ token })
}
