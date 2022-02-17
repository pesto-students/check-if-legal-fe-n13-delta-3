import { HttpApi, HttpMethod } from "../../../core/http"
import { IOffering } from "./IOffering"

export async function offeringListApi(payload: { token: string }) {
	const httpApi = new HttpApi<IOffering[]>(HttpMethod.GET, `/offering`)
	return await httpApi.send(payload)
}
