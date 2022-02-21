import { HttpApi, HttpMethod } from "../../../core/http"
import { ICity } from "./ICity"

export async function apiCityList() {
	const httpApi = new HttpApi<ICity[]>(HttpMethod.GET, "/city")
	return await httpApi.send()
}
