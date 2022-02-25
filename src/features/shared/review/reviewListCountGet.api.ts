import { HttpApi, HttpMethod } from "../../../core/http"
import { ReviewStatus } from "./IReview"

export async function apiReviewListCountGet({
	token,
	paperTypeId,
	status,
}: {
	token: string
	paperTypeId?: number
	status?: ReviewStatus
}) {
	const httpApi = new HttpApi<number>(HttpMethod.GET, "/review/count")
	return await httpApi.send({ query: { paperTypeId, status }, token })
}
