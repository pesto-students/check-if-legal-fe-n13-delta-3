import { HttpApi, HttpMethod } from "../../core/http"
import { ILanguage } from "./ILanguage"

export async function languageListApi() {
	const httpApi = new HttpApi<ILanguage[]>(HttpMethod.GET, "/language")
	const response = await httpApi.send()
	return response
}
