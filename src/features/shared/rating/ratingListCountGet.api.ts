import { HttpApi, HttpMethod } from "../../../core/http"

export async function apiRatingListCountGet({ token }: { token: string }) {
	const httpApi = new HttpApi<number>(HttpMethod.GET, "/rating/count")
	return await httpApi.send({ token })
}
