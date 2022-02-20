import { HttpApi, HttpMethod } from "../../../../core/http"
import { IReviewPayment } from "../IReviewPayment"

export async function apiReviewPaymentGet({
	reviewId,
	token,
}: {
	reviewId: number
	token: string
}) {
	const httpApi = new HttpApi<IReviewPayment>(
		HttpMethod.GET,
		`/review/${reviewId}/payment`,
	)
	return await httpApi.send({ body: { reviewId }, token })
}
