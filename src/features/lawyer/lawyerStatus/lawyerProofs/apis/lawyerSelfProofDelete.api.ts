import { HttpApi, HttpMethod } from "../../../../../core/http"

export async function apiLawyerSelfProofDelete({
	fileName,
	token,
}: {
	fileName: string
	token: string
}) {
	const httpApi = new HttpApi(HttpMethod.DELETE, `/lawyer/self/proof/${fileName}`)
	await httpApi.send({ token })
}
