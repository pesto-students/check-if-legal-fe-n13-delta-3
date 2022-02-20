import { HttpApi, HttpMethod } from "../../../../core/http"

export async function apiReviewDocumentsUpload({
	id,
	formData,
	token,
}: {
	id: number
	formData: FormData
	token: string
}) {
	const httpApi = new HttpApi(HttpMethod.POST, `/review/${id}/document`, {
		isFormData: true,
	})
	await httpApi.send({ body: formData, token })
}
