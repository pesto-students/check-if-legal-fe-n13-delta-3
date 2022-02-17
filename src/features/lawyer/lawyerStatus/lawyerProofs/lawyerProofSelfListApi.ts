import { HttpApi, HttpMethod } from "../../../../core/http"

export async function lawyerProofSelfListApi({ token }: { token: string }) {
	const httpApi = new HttpApi<string[]>(HttpMethod.GET, `/lawyer/self/proof`)
	return await httpApi.send({ token })
}
