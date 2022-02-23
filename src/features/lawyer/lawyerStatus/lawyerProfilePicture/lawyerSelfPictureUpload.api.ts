import { HttpApi, HttpMethod } from "../../../../core/http"

export async function apiLawyerPictureUpload({
	formData,
	token,
}: {
	formData: FormData
	token: string
}) {
	const httpApi = new HttpApi(HttpMethod.POST, `/lawyer/self/picture`, {
		isFormData: true,
	})
	await httpApi.send({ body: formData, token })
}
