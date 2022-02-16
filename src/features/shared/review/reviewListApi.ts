import { HttpApi, HttpMethod } from "../../../core/http"
import { IReview } from "./IReview"

export async function reviewListApi({ token }: { token: string }) {
	const httpApi = new HttpApi<IReview[]>(HttpMethod.GET, "/review")
	return await httpApi.send({ token })
}
