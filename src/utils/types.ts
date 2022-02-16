import { AuthRole } from "./enums"

export interface IAuthPayload {
	role: AuthRole
	token: string
	isVerified: boolean
}
