import { HttpApi, HttpMethod } from "../../core/http"
import { IReview } from "./IReview"

export async function reviewListApi({
	include,
	token,
}: {
	include?: { user?: boolean; lawyer?: boolean }
	token: string
}) {
	const httpApi = new HttpApi<IReview[]>(HttpMethod.GET, "/review")
	return await httpApi.send({ body: { include }, token })
}
