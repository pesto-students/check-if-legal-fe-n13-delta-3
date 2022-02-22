import { HttpApi, HttpMethod } from "../../../../core/http"

export async function apiLawyerBankUpsert(
	payload: { bankName: string; bankIfsc: string; accountNumber: string },
	token: string,
) {
	const httpApi = new HttpApi(HttpMethod.PUT, `/lawyer/bank`)
	await httpApi.send({ body: payload, token })
}
