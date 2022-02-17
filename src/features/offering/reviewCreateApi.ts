import { HttpApi, HttpMethod } from "../../core/http"

export async function reviewCreateApi({
	token,
	offeringId,
	cityId,
}: {
	offeringId: number
	cityId: number
	token: string
}) {
	const httpApi = new HttpApi<{ id: string }>(HttpMethod.POST, "/review")
	return await httpApi.send({ body: { offeringId, cityId }, token })
}
