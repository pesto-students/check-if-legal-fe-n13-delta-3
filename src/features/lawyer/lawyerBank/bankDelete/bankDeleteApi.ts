import { HttpApi, HttpMethod } from "../../../../core/http"

export async function bankDeleteApi(payload: { id: number }, token: string) {
	const httpApi = new HttpApi(HttpMethod.DELETE, `/lawyer/bank/${payload.id}`)
	await httpApi.send({ token })
}
