import { HttpApi, HttpMethod } from "../../../../core/http"
import { AuthRole } from "../../../../utils/enums"

interface IResponseShape {
	role: AuthRole
	token: string
	isVerified: boolean
}

export async function userDemoLoginApi(payload: { isLawyer: boolean }) {
	const httpApi = new HttpApi<IResponseShape>(HttpMethod.POST, "/user/demo/login")
	return await httpApi.send({ body: payload })
}
