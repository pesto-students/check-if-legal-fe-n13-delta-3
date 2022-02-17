import { HttpApi, HttpMethod } from "../../../core/http"
import { IBank } from "./IBank"

export async function bankListApi(payload: { token: string }) {
	const httpApi = new HttpApi<IBank[]>(HttpMethod.GET, `/lawyer/bank`)
	return await httpApi.send(payload)
}
