import { HttpApi, HttpMethod } from "../../../../core/http"
import { IReviewPayment } from "../reviewPayment/IReviewPayment"

export async function apiReviewPaymentGet({
	reviewId,
	token,
}: {
	reviewId: number
	token: string
}) {
	const httpApi = new HttpApi<IReviewPayment | null>(
		HttpMethod.GET,
		`/review/${reviewId}/payment`,
	)
	const payment = await httpApi.send({ body: { reviewId }, token })
	return payment || null
}
