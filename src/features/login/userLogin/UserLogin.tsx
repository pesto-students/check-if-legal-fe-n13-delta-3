import { FC, useCallback, useEffect } from "react"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import { storage } from "../../../utils/storage"
import { IAuthPayload } from "../../../utils/types"
import { useSuccessToast } from "../../shared/hooks/useSuccessToast"
import { LoginLayout } from "./components/LoginLayout"
import { UserSignInWithGoogle } from "./components/UserSignInWithGoogle"

export const UserLogin: FC = () => {
	const auth = storage.getAuth()
	const navigate = useNavigate()
	const location = useLocation()

	const successToast = useSuccessToast()

	useEffect(() => {
		if (auth) navigate(`/${auth.role}`)
	}, [auth, navigate])

	const onLoginSuccess = useCallback(
		(authPayload: IAuthPayload) => {
			storage.setAuth(authPayload)
			successToast("Login Successful")

			const from = location.state as string | undefined
			navigate(from ?? `/${authPayload.role}`)
		},
		[navigate, location, successToast],
	)

	if (auth) <Navigate to={`/${auth.role}`} />

	return (
		<LoginLayout>
			<UserSignInWithGoogle onLoginSuccess={onLoginSuccess} />
		</LoginLayout>
	)
}
