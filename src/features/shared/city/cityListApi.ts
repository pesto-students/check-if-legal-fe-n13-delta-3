import { HttpApi, HttpMethod } from "../../../core/http"
import { ICity } from "./ICity"

export async function cityListApi() {
	const httpApi = new HttpApi<ICity[]>(HttpMethod.GET, "/city")
	const response = await httpApi.send()
	return response
}
