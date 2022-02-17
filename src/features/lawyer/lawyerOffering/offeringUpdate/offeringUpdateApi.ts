import { HttpApi, HttpMethod } from "../../../../core/http"

export async function offeringUpdateApi(
	{
		id,
		description,
		price,
		expectedTimeInHours,
		languageId,
		paperTypeId,
	}: {
		id: number
		paperTypeId?: number
		languageId?: number
		price?: number
		expectedTimeInHours?: number
		description?: string | null
	},
	token: string,
) {
	const httpApi = new HttpApi(HttpMethod.PATCH, `/offering/${id}`)
	await httpApi.send({
		body: { description, price, expectedTimeInHours, languageId, paperTypeId },
		token,
	})
}
