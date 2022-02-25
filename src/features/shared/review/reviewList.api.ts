import { HttpApi, HttpMethod } from "../../../core/http"
import { IReview, ReviewStatus } from "./IReview"

export async function apiReviewList({
	token,
	pageNo,
	limit,
	paperTypeId,
	status,
}: {
	token: string
	pageNo: number
	limit: number
	paperTypeId?: number
	status?: ReviewStatus
}) {
	const httpApi = new HttpApi<IReview[]>(HttpMethod.GET, "/review")
	return await httpApi.send({
		query: { paperTypeId, status, pageNo, limit },
		token,
	})
}
