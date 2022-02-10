import { HttpApi, HttpMethod } from "../../../../core/http"

interface IResponseShape {
	id: number
}

export async function languageAddApi(payload: { name: string }, token: string) {
	const httpApi = new HttpApi<IResponseShape>(HttpMethod.POST, "/language")
	return await httpApi.send({ body: payload, token })
}
