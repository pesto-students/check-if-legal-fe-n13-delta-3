import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthRole } from "../../utils/enums"
import { storage } from "../../utils/storage"
import { IAuthPayload } from "../../utils/types"

export function useUserAuth() {
	const navigate = useNavigate()
	const authPayload = storage.getAuth()

	useEffect(() => {
		if (!authPayload) navigate("/login")
		if (authPayload?.role !== AuthRole.USER) navigate("/login")
	}, [authPayload, authPayload?.role, navigate])

	return authPayload as IAuthPayload
}
