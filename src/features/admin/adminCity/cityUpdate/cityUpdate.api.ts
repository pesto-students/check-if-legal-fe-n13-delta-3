import { HttpApi, HttpMethod } from "../../../../core/http"

export async function apiCityUpdate(
	{ id }: { id: number },
	update: { name?: string; stateId?: number },
	token: string,
) {
	const httpApi = new HttpApi(HttpMethod.PATCH, `/city/${id}`)
	await httpApi.send({ body: update, token })
}
