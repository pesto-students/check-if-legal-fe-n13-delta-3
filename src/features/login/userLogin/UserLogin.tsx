import { FC, useCallback } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { storage } from "../../../utils/storage"
import { IAuthPayload } from "../../../utils/types"
import { useSuccessToast } from "../../shared/hooks/useSuccessToast"
import { LoginLayout } from "./components/LoginLayout"
import { UserSignInWithGoogle } from "./components/UserSignInWithGoogle"

export const UserLogin: FC = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const successToast = useSuccessToast()

	const onLoginSuccess = useCallback(
		(authPayload: IAuthPayload) => {
			storage.setAuth(authPayload)
			successToast("Login Successful")

			const from = location.state as string | undefined
			navigate(from ?? `/${authPayload.role}`)
		},
		[navigate, location, successToast],
	)

	return (
		<LoginLayout>
			<UserSignInWithGoogle onLoginSuccess={onLoginSuccess} />
		</LoginLayout>
	)
}
