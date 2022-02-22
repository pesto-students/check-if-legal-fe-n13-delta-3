import { HttpApi, HttpMethod } from "../../../../../core/http"

export async function apiLawyerProofsUpload({
	formData,
	token,
}: {
	formData: FormData
	token: string
}) {
	const httpApi = new HttpApi(HttpMethod.POST, `/lawyer/self/proof`, {
		isFormData: true,
	})
	await httpApi.send({ body: formData, token })
}
