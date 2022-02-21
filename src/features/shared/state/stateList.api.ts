import { HttpApi, HttpMethod } from "../../../core/http"
import { IState } from "./IState"

export async function apiStateList() {
	const httpApi = new HttpApi<IState[]>(HttpMethod.GET, "/state")
	return await httpApi.send()
}
