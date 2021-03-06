import { HttpApi, HttpMethod } from "../../../../core/http"

export async function apiCityDelete(payload: { id: number }, token: string) {
	const httpApi = new HttpApi(HttpMethod.DELETE, `/city/${payload.id}`)
	await httpApi.send({ token })
}
