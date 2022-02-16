import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthRole } from "../../utils/enums"
import { storage } from "../../utils/storage"
import { IAuthPayload } from "../../utils/types"

export function useLawyerAuth() {
	const navigate = useNavigate()
	const authPayload = storage.getAuth()

	useEffect(() => {
		if (!authPayload) navigate("/login")
		if (authPayload?.role !== AuthRole.LAWYER) navigate("/login")
	}, [authPayload, authPayload?.role, navigate])

	return authPayload as IAuthPayload
}
