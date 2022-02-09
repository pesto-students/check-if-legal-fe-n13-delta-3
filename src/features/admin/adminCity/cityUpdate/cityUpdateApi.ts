import { HttpApi, HttpMethod } from "../../../../core/http"

interface IResponseShape {
	id: number
}

export async function cityUpdateApi(
	{ id, name, stateId }: { id: number; name?: string; stateId?: number },
	token: string,
) {
	const httpApi = new HttpApi<IResponseShape>(HttpMethod.PATCH, `/city/${id}`)
	return await httpApi.send({ body: { name, stateId }, token })
}
