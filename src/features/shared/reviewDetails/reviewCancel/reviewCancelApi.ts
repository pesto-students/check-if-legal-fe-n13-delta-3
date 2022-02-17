import { HttpApi, HttpMethod } from "../../../../core/http"

export async function reviewCancelApi({ id, token }: { id: number; token: string }) {
	const httpApi = new HttpApi(HttpMethod.DELETE, `/review/${id}`)
	await httpApi.send({ token })
}
