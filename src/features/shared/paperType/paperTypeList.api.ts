import { HttpApi, HttpMethod } from "../../../core/http"
import { IPaperType } from "./IPaperType"

export async function apiPaperTypeList() {
	const httpApi = new HttpApi<IPaperType[]>(HttpMethod.GET, "/paperType")
	return await httpApi.send()
}
