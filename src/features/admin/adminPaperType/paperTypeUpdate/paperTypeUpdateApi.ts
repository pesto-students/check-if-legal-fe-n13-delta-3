import { HttpApi, HttpMethod } from "../../../../core/http"

interface IResponseShape {
	id: number
}

export async function paperTypeUpdateApi(
	{ id, name }: { id: number; name?: string },
	token: string,
) {
	const httpApi = new HttpApi<IResponseShape>(HttpMethod.PATCH, `/paperType/${id}`)
	return await httpApi.send({ body: { name }, token })
}
