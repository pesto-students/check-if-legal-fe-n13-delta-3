import { HttpApi, HttpMethod } from "../../../../core/http"

interface IResponseShape {
	id: number
}

export async function bankAddApi(
	payload: { bankName: string; bankIfsc: string; accountNumber: string },
	token: string,
) {
	const httpApi = new HttpApi<IResponseShape>(HttpMethod.POST, "/lawyer/bank")
	return await httpApi.send({ body: payload, token })
}
