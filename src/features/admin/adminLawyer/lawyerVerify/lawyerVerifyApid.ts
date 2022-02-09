import { HttpApi, HttpMethod } from "../../../../core/http"

export async function lawyerVerifyApi({ id }: { id: number }, token: string) {
	const httpApi = new HttpApi<void>(HttpMethod.POST, `/lawyer/${id}/verify`)
	await httpApi.send({ token })
}
