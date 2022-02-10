import { HttpApi, HttpMethod } from "../../../../core/http"

export async function languageDeleteApi(payload: { id: number }, token: string) {
	const httpApi = new HttpApi(HttpMethod.DELETE, `/language/${payload.id}`)
	await httpApi.send({ token })
}
