import { HttpApi, HttpMethod } from "../../../../core/http"
import { IReviewFeedback } from "../reviewFeedback/IReviewFeedback"

export async function apiReviewFeedbackList({
	reviewId,
	token,
}: {
	reviewId: number
	token: string
}) {
	const httpApi = new HttpApi<IReviewFeedback[]>(
		HttpMethod.GET,
		`/review/${reviewId}/feedback`,
	)
	return await httpApi.send({ token })
}
