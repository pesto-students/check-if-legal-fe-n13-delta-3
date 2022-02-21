import { HttpApi, HttpMethod } from "../../../core/http"
import { ILanguage } from "./ILanguage"

export async function apiLanguageList() {
	const httpApi = new HttpApi<ILanguage[]>(HttpMethod.GET, "/language")
	return await httpApi.send()
}
