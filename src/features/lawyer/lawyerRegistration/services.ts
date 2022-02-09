import { HttpApi, HttpMethod } from "../../../core/http"
import { storage } from "../../../utils/storage"
interface IResponseShape {
	token: string
}

export async function lawyerRegister(payload: any) {
	const httpApi = new HttpApi<IResponseShape>(HttpMethod.POST, "/lawyer/register")
	const tokenData: any = storage.getAuth()
	const response = await httpApi.send({ token: tokenData.token, body: payload })
	return response
}
