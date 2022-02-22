import { HttpApi, HttpMethod } from "../../../../core/http"
import { IBank } from "./IBank"

export async function apiLawyerBankGet(payload: { token: string }) {
	const httpApi = new HttpApi<IBank | null>(HttpMethod.GET, `/lawyer/bank`)
	return await httpApi.send(payload)
}
