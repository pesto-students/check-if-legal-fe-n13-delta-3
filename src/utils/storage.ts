import { AuthRole } from "./enums"
import { IAuthPayload } from "./types"

export const storage = {
	getAuth: (): IAuthPayload | null => {
		return JSON.parse(window.localStorage.getItem("token") as string) as {
			token: string
			role: AuthRole
			isVerified: boolean
		} | null
	},
	setAuth: (payload: IAuthPayload) => {
		window.localStorage.setItem("token", JSON.stringify(payload))
	},
	setIsVerified: (isVerified: boolean) => {
		const payload = storage.getAuth()
		window.localStorage.setItem("token", JSON.stringify({ ...payload, isVerified }))
	},
	clearAuth: () => {
		window.localStorage.removeItem("token")
	},
}
