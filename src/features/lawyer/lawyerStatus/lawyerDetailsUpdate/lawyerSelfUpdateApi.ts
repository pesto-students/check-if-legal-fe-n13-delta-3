import { HttpApi, HttpMethod } from "../../../../core/http"

export async function lawyerUpdateApi(
	payload: {
		name?: string
		cityId?: number
		address?: string
		description?: string
		phone?: string
	},
	token: string,
) {
	const httpApi = new HttpApi(HttpMethod.PATCH, `/lawyer/self`)
	await httpApi.send({ body: payload, token })
}
