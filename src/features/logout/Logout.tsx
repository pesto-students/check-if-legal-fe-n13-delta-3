import { FC } from "react"
import { Navigate } from "react-router-dom"
import { AuthRole } from "../../utils/enums"
import { storage } from "../../utils/storage"

export const Logout: FC = () => {
	const authPayload = storage.getAuth()
	const navigatePath = authPayload?.role === AuthRole.ADMIN ? "/login/admin" : "/login"
	storage.clearAuth()

	return <Navigate to={navigatePath} />
}
