import { Center } from "@chakra-ui/react"
import _ from "lodash"
import { FC, useEffect } from "react"
import { Navigate } from "react-router-dom"
import { CenteredSpinner } from "../../shared/components/ui/CenterSpinner"
import { useLawyerAuth } from "../useLawyerAuth"
import { useLawyerStore } from "../useLawyerStore"
import { LawyerRegisterForm } from "./LawyerRegisterForm"

export const LawyerRegister: FC = () => {
	const { token } = useLawyerAuth()
	const { lawyer, fetchLawyer } = useLawyerStore()

	useEffect(() => {
		if (_.isUndefined(lawyer)) fetchLawyer({ token })
	}, [fetchLawyer, token, lawyer])

	if (_.isUndefined(lawyer)) return <CenteredSpinner />
	if (lawyer) {
		const to = lawyer.isVerified ? "/lawyer" : "/lawyer/status"
		return <Navigate to={to} />
	}

	return (
		<Center>
			<LawyerRegisterForm />
		</Center>
	)
}
