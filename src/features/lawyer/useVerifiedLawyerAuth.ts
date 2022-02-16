import _ from "lodash"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useLawyerAuth } from "./useLawyerAuth"
import { useLawyerStore } from "./useLawyerStore"

export function useVerifiedLawyerAuth() {
	const token = useLawyerAuth()
	const { lawyer, fetchLawyer } = useLawyerStore()
	const navigate = useNavigate()

	useEffect(() => {
		if (_.isUndefined(lawyer)) fetchLawyer({ token })
	}, [fetchLawyer, lawyer, token])

	if (!lawyer || !lawyer?.isVerified) {
		navigate("/lawyer/register")
	}

	return token
}
