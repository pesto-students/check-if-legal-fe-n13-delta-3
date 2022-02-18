import {
	Box,
	Button,
	Center,
	Flex,
	Radio,
	RadioGroup,
	Stack,
	Text,
} from "@chakra-ui/react"
import { FC, useState } from "react"
import { GoogleLogin, GoogleLoginResponse } from "react-google-login"
import { FcGoogle } from "react-icons/fc"
import { useLocation, useNavigate } from "react-router-dom"
import { ErrorText } from "../../shared/components/ui/ErrorText"
import { Title } from "../../shared/components/ui/Title"
import { GOOGLE_CLIENT_ID } from "../../../configs"
import { userGoogleAuthApi } from "./userGoogleAuthApi"
import { getErrorMessage } from "../../../utils/helpers"

export const UserSignInWithGoogle: FC = () => {
	const [isLawyer, setIsLawyer] = useState(false)
	const [errorText, setErrorText] = useState<string>()
	const navigate = useNavigate()
	const location = useLocation()

	const onSuccess = async (response: any) => {
		try {
			const { tokenId } = response as GoogleLoginResponse
			const { role } = await userGoogleAuthApi({ idToken: tokenId, isLawyer })

			const from = location.state as string | undefined
			navigate(from ?? `/${role}`)
		} catch (err) {
			const message = getErrorMessage(err)
			setErrorText(message)
		}
	}

	const onFailure = (error: any) => {
		setErrorText(error)
		console.log(error)
	}

	return (
		<Box textAlign={"center"}>
			<Box>
				<Flex direction={"column"} gap={4} alignItems="center">
					<Title>Sign in to your Account</Title>
					<Text color="gray.600">
						If you do not have an account, your account will be created based in
						your Google account info.
					</Text>

					<Text fontWeight={"semibold"} mt="4">
						Continue as
					</Text>
					<RadioGroup
						onChange={(value) => setIsLawyer(value === "lawyer")}
						value={isLawyer ? "lawyer" : "user"}
					>
						<Stack justifyContent={"center"} gap={4} direction="row">
							<Radio value="user">User</Radio>
							<Radio value="lawyer">Lawyer</Radio>
						</Stack>
					</RadioGroup>

					{errorText && <ErrorText text={errorText} />}

					<GoogleLogin
						clientId={GOOGLE_CLIENT_ID}
						render={(renderProps) => (
							<Button
								width={"sm"}
								backgroundColor={"white"}
								_hover={{ backgroundColor: "gray.50" }}
								leftIcon={<FcGoogle />}
								{...renderProps}
							>
								<Center>
									<Text>Sign in with Google</Text>
								</Center>
							</Button>
						)}
						onSuccess={onSuccess}
						onFailure={onFailure}
					/>

					<Button
						width={"sm"}
						backgroundColor={"white"}
						_hover={{ backgroundColor: "gray.50" }}
						onClick={() => {
							const demoGoogleUserIdToken = isLawyer
								? process.env.REACT_APP_DEMO_LAWYER_ID_TOKEN
								: process.env.REACT_APP_DEMO_USER_ID_TOKEN
							if (!demoGoogleUserIdToken) {
								console.log("No demo user id token found")
								setErrorText("Demo user id token not set")
								return
							}

							onSuccess({ idToken: demoGoogleUserIdToken })
						}}
					>
						<Center>
							<Text>Try as demo {isLawyer ? "Lawyer" : "User"}</Text>
						</Center>
					</Button>
				</Flex>
			</Box>
		</Box>
	)
}
