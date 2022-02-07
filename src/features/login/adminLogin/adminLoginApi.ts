import { HttpApi, HttpMethod } from "../../../core/http"
import { AuthRole } from "../../../utils/enums"
import { storage } from "../../../utils/storage"

interface IResponseShape {
	token: string
}

export async function adminLoginApi(payload: { username: string; password: string }) {
	const httpApi = new HttpApi<IResponseShape>(HttpMethod.POST, "/admin/login")
	storage.setAuth({ role: AuthRole.ADMIN, token: "admin" })
	await httpApi.send({ body: payload })
}
