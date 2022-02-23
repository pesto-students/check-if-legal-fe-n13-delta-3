import { FC } from "react"
import { Navigate } from "react-router-dom"
import { CenteredSpinner } from "../../shared/components/ui/CenterSpinner"
import { useLawyerQuery } from "../lawyer.query"
import { useLawyerAuth } from "../useLawyerAuth"
import { LawyerRegisterForm } from "./components/LawyerRegisterForm"
import { LawyerRegisterLayout } from "./components/LawyerRegisterLayout"

export const LawyerRegister: FC = () => {
	const { token } = useLawyerAuth()
	const { data: lawyer, isLoading } = useLawyerQuery({ token })

	if (isLoading) return <CenteredSpinner />

	if (lawyer) {
		const to = lawyer.isVerified ? "/lawyer" : "/lawyer/status"
		return <Navigate to={to} />
	}

	return (
		<LawyerRegisterLayout>
			<LawyerRegisterForm />
		</LawyerRegisterLayout>
	)
}
