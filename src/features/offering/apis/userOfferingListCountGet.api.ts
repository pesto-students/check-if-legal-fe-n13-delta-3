import { HttpApi, HttpMethod } from "../../../core/http"

export async function apiUserOfferingListCountGet({
	paperTypeId,
	cityId,
	languageId,
}: {
	paperTypeId: number
	languageId: number
	cityId: number
}) {
	const httpApi = new HttpApi<number>(HttpMethod.GET, "/user/offering/count")
	return await httpApi.send({ query: { paperTypeId, languageId, cityId } })
}
