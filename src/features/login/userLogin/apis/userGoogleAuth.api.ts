import { HttpApi, HttpMethod } from "../../../../core/http"
import { AuthRole } from "../../../../utils/enums"

interface IResponseShape {
	role: AuthRole
	token: string
	isVerified: boolean
}

export async function userGoogleAuthApi(payload: { idToken: string; isLawyer: boolean }) {
	const httpApi = new HttpApi<IResponseShape>(HttpMethod.POST, "/user/googleAuth")
	return await httpApi.send({ body: payload })
}
