import { HttpApi, HttpMethod } from "../../../core/http"

export async function apiPaymentListCountGet({ token }: { token: string }) {
	const httpApi = new HttpApi<number>(HttpMethod.GET, "/payment/count")
	return await httpApi.send({ token })
}
