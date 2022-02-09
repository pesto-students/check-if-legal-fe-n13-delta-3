import { HttpApi, HttpMethod } from "../../../../core/http"

export async function paperTypeDeleteApi(payload: { id: number }, token: string) {
	const httpApi = new HttpApi(HttpMethod.DELETE, `/paperType/${payload.id}`)
	await httpApi.send({ token })
}
