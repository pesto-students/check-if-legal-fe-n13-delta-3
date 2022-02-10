import { useNavigate } from "react-router-dom"
import { AuthRole } from "../../utils/enums"
import { storage } from "../../utils/storage"
import { IAuthPayload } from "../../utils/types"

export function useAdminAuth() {
	const navigate = useNavigate()
	const authPayload = storage.getAuth()

	if (!authPayload) navigate("/login/admin")
	if (authPayload?.role !== AuthRole.ADMIN) navigate("/login")

	return authPayload as IAuthPayload
}
