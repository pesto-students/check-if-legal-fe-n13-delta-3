import { HttpApi, HttpMethod } from "../../../../core/http"

interface IResponseShape {
	id: number
}

export async function offeringAddApi(
	payload: {
		paperTypeId: number
		languageId: number
		price: number
		expectedTimeInHours: number
		description?: string
	},
	token: string,
) {
	const httpApi = new HttpApi<IResponseShape>(HttpMethod.POST, "/offering")
	return await httpApi.send({ body: payload, token })
}
