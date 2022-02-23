import { HttpApi, HttpMethod } from "../../../core/http"

export async function apiReviewListCountGet({ token }: { token: string }) {
	const httpApi = new HttpApi<number>(HttpMethod.GET, "/review/count")
	return await httpApi.send({ token })
}
