import { useNavigate } from "react-router-dom"
import { storage } from "../../utils/storage"
import { IAuthPayload } from "../../utils/types"

export function useAdminAuth() {
	const navigate = useNavigate()
	const authPayload = storage.getAuth()
	if (!authPayload) navigate("/login/admin")
	return authPayload as IAuthPayload
}
