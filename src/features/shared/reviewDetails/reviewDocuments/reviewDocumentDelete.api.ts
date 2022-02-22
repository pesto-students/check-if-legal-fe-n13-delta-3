import { HttpApi, HttpMethod } from "../../../../core/http"

export async function apiReviewDocumentDelete({
	reviewId,
	fileName,
	token,
}: {
	reviewId: number
	fileName: string
	token: string
}) {
	const httpApi = new HttpApi(
		HttpMethod.DELETE,
		`/review/${reviewId}/document/${fileName}`,
	)
	await httpApi.send({ token })
}
