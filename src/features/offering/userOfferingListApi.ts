import { HttpApi, HttpMethod } from "../../core/http"
import { IUserOffering } from "./IUserOffering"

export async function userOfferingListApi({
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
		body: { paperTypeId, languageId, cityId },
		token,
	})
	return response
}
