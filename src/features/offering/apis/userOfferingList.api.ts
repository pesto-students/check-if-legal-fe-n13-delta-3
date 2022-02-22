import { HttpApi, HttpMethod } from "../../../core/http"
import { IUserOffering } from "../IUserOffering"

export async function apiUserOfferingList({
	token,
	paperTypeId,
	cityId,
	languageId,
}: {
	paperTypeId: number
	languageId: number
	cityId: number
	token?: string
}) {
	const httpApi = new HttpApi<IUserOffering[]>(HttpMethod.GET, "/user/offering")
	const response = await httpApi.send({
		query: { paperTypeId, languageId, cityId },
		token,
	})
	return response
}
