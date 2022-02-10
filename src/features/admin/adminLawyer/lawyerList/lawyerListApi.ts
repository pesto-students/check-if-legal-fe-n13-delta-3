import { HttpApi, HttpMethod } from "../../../../core/http"
import { ILawyer } from "./ILawyer"

export async function lawyerListApi({
	token,
	isSuspended,
	isVerified,
}: {
	isSuspended?: boolean | undefined
	isVerified?: boolean | undefined
	token: string
}) {
	const httpApi = new HttpApi<ILawyer[]>(HttpMethod.GET, "/lawyer")
	const response = await httpApi.send({
		body: { isSuspended, isVerified },
		token,
	})
	return response
}
