import { HttpApi, HttpMethod } from "../../../core/http"
import { IUserOffering } from "../IUserOffering"

export async function apiUserOfferingList({
	token,
	paperTypeId,
	cityId,
	languageId,
	pageNo,
	limit,
}: {
	paperTypeId: number
	languageId: number
	cityId: number
	token?: string
	pageNo?: number
	limit?: number
}) {
	const httpApi = new HttpApi<IUserOffering[]>(HttpMethod.GET, "/user/offering")
	return await httpApi.send({
		query: { paperTypeId, languageId, cityId, pageNo, limit },
		token,
	})
}
