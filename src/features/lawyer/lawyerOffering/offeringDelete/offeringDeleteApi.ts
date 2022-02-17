import { HttpApi, HttpMethod } from "../../../../core/http"

export async function offeringDeleteApi(payload: { id: number }, token: string) {
	const httpApi = new HttpApi(HttpMethod.DELETE, `/offering/${payload.id}`)
	await httpApi.send({ token })
}
