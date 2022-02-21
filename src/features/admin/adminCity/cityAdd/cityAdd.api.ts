import { HttpApi, HttpMethod } from "../../../../core/http"

interface IResponseShape {
	id: number
}

export async function apiCityAdd(
	payload: { name: string; stateId: number },
	token: string,
) {
	const httpApi = new HttpApi<IResponseShape>(HttpMethod.POST, "/city")
	return await httpApi.send({ body: payload, token })
}
