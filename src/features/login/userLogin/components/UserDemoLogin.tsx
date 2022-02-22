import { Button, Text } from "@chakra-ui/react"
import { FC, useCallback, useState } from "react"
import { getErrorMessage } from "../../../../utils/helpers"
import { IAuthPayload } from "../../../../utils/types"
import { useErrorToast } from "../../../shared/hooks/useErrorToast"
import { userDemoLoginApi } from "../apis/userDemoLogin.api"

interface IProps {
	isLawyer: boolean
	onLoginSuccess: (response: IAuthPayload) => void
}

export const DemoLogin: FC<IProps> = ({ isLawyer, onLoginSuccess }) => {
	const [isLoading, setIsLoading] = useState(false)
	const errorToast = useErrorToast()

	const handleDemoLogin = useCallback(() => {
		setIsLoading(true)

		return userDemoLoginApi({ isLawyer })
			.then((auth) => onLoginSuccess(auth))
			.catch((error) => errorToast(getErrorMessage(error)))
			.finally(() => setIsLoading(false))
	}, [isLawyer, onLoginSuccess, errorToast])

	return (
		<Button
			width={"sm"}
			backgroundColor={"white"}
			_hover={{ backgroundColor: "gray.50" }}
			onClick={handleDemoLogin}
			isLoading={isLoading}
			isDisabled={isLoading}
		>
			<Text>Try as demo {isLawyer ? "Lawyer" : "User"}</Text>
		</Button>
	)
}
