import { HttpApi, HttpMethod } from "../../../core/http"
import { IReview } from "./IReview"

export async function apiReviewList({
	token,
	pageNo,
	limit,
}: {
	token: string
	pageNo: number
	limit: number
}) {
	const httpApi = new HttpApi<IReview[]>(HttpMethod.GET, "/review")
	return await httpApi.send({ query: { pageNo, limit }, token })
}
