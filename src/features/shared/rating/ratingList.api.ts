import { HttpApi, HttpMethod } from "../../../core/http"
import { IRating } from "./IRating"

export async function apiRatingList({
	token,
	pageNo,
	limit,
}: {
	token: string
	pageNo: number
	limit: number
}) {
	const httpApi = new HttpApi<IRating[]>(HttpMethod.GET, "/rating")
	return await httpApi.send({ query: { pageNo, limit }, token })
}
