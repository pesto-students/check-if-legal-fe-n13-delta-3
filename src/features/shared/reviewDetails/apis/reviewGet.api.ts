import { HttpApi, HttpMethod } from "../../../../core/http"
import { IReview } from "../../review/IReview"

export async function apiReviewGet({ id, token }: { id: number; token: string }) {
	const httpApi = new HttpApi<IReview>(HttpMethod.GET, `/review/${id}`)
	return await httpApi.send({ token })
}
