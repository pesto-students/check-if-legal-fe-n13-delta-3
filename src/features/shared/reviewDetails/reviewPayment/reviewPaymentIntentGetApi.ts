import { HttpApi, HttpMethod } from "../../../../core/http"

interface IResponseShape {
	orderId: string
	idKey: string
	amount: number
	currency: string
	name: string
	description?: string
}

export async function reviewPaymentIntentGetApi({
	reviewId,
	token,
}: {
	reviewId: number
	token: string
}) {
	const httpApi = new HttpApi<IResponseShape>(
		HttpMethod.GET,
		`/review/${reviewId}/payment/intent`,
	)
	return await httpApi.send({ body: { reviewId }, token })
}
