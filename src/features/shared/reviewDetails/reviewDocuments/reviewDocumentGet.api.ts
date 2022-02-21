import { HttpApi, HttpMethod } from "../../../../core/http"

interface IResponseShape {
	base64File: string
}

export async function apiReviewDocumentGet({
	reviewId,
	fileName,
	token,
}: {
	reviewId: number
	fileName: string
	token: string
}) {
	const httpApi = new HttpApi<IResponseShape>(
		HttpMethod.GET,
		`/review/${reviewId}/document/${fileName}`,
	)
	return await httpApi.send({ token })
}
