import { HttpApi, HttpMethod } from "../../../core/http"

export async function apiGetPaymentList(payload: { token: string }) {
	const httpApi = new HttpApi<any>(HttpMethod.GET, `/list/payments/`)
	return await httpApi.send(payload)
}
