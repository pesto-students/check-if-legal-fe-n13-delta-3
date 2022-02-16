import { HttpApi, HttpMethod } from "../../../core/http"

interface IPayload {
	name: string
	cityId: number
	address: string
	description: string
	phone: string
}

interface IResponseShape {
	id: number
}

export async function lawyerRegisterApi(payload: IPayload, token: string) {
	const httpApi = new HttpApi<IResponseShape>(HttpMethod.POST, "/lawyer/register")
	return await httpApi.send({ token, body: payload })
}
