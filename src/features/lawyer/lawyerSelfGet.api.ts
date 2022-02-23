import { HttpApi, HttpMethod } from "../../core/http"
import { ILawyer } from "./ILawyer"

export async function apiLawyerSelfGet(payload: { token: string }) {
	const httpApi = new HttpApi<ILawyer | null>(HttpMethod.GET, `/lawyer/self`)
	const lawyer = await httpApi.send(payload)
	return lawyer ?? null
}
