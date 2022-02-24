import { HttpApi, HttpMethod } from "../../../core/http"
import { IReviewPayment } from "../../shared/reviewDetails/reviewPayment/IReviewPayment"

export async function apiPaymentList({
	token,
	limit,
	pageNo,
}: {
	token: string
	pageNo: number
	limit: number
}) {
	const httpApi = new HttpApi<IReviewPayment[]>(HttpMethod.GET, `/payment`)
	return await httpApi.send({ query: { limit, pageNo }, token })
}
