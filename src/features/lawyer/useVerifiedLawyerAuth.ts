import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useLawyerAuth } from "./useLawyerAuth"

export function useVerifiedLawyerAuth() {
	const authPayload = useLawyerAuth()
	const navigate = useNavigate()

	useEffect(() => {
		if (!authPayload.isVerified) navigate("/lawyer/register")
	}, [authPayload.isVerified, navigate])

	return authPayload
}
