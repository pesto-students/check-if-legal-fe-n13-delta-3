import { HttpApi, HttpMethod } from "../../core/http"
import { IState } from "./IState"

export async function stateListApi() {
	const httpApi = new HttpApi<IState[]>(HttpMethod.GET, "/state")
	const response = await httpApi.send()
	return response
}
