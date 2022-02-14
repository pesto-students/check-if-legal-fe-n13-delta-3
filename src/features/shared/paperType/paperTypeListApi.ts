import { HttpApi, HttpMethod } from "../../../core/http"
import { IPaperType } from "./IPaperType"

export async function paperTypeListApi() {
	const httpApi = new HttpApi<IPaperType[]>(HttpMethod.GET, "/paperType")
	const response = await httpApi.send()
	return response
}
