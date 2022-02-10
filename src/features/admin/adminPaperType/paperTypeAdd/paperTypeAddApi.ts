import { HttpApi, HttpMethod } from "../../../../core/http"

interface IResponseShape {
	id: number
}

export async function paperTypeAddApi(payload: { name: string }, token: string) {
	const httpApi = new HttpApi<IResponseShape>(HttpMethod.POST, "/paperType")
	return await httpApi.send({ body: payload, token })
}
