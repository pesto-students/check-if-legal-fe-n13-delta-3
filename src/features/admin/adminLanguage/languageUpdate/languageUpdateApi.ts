import { HttpApi, HttpMethod } from "../../../../core/http"

interface IResponseShape {
	id: number
}

export async function languageUpdateApi(
	{ id, name }: { id: number; name?: string },
	token: string,
) {
	const httpApi = new HttpApi<IResponseShape>(HttpMethod.PATCH, `/language/${id}`)
	return await httpApi.send({ body: { name }, token })
}
