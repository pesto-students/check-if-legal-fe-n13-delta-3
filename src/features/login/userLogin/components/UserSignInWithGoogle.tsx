import { Box, Button, Flex, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react"
import { FC, useState } from "react"
import { GoogleLogin, GoogleLoginResponse } from "react-google-login"
import { FcGoogle } from "react-icons/fc"
import { GOOGLE_CLIENT_ID } from "../../../../configs"
import { getErrorMessage } from "../../../../utils/helpers"
import { IAuthPayload } from "../../../../utils/types"
import { ErrorText } from "../../../shared/components/ui/ErrorText"
import { Title } from "../../../shared/components/ui/Title"
import { userGoogleAuthApi } from "../apis/userGoogleAuth.api"
import { DemoLogin } from "./UserDemoLogin"

interface IProps {
	onLoginSuccess: (response: IAuthPayload) => void
}

export const UserSignInWithGoogle: FC<IProps> = ({ onLoginSuccess }) => {
	const [isLawyer, setIsLawyer] = useState(false)
	const [errorText, setErrorText] = useState<string>()

	const onSuccess = (googleLoginResponse: any) => {
		const { tokenId } = googleLoginResponse as GoogleLoginResponse
		return userGoogleAuthApi({ idToken: tokenId, isLawyer })
			.then((auth) => onLoginSuccess(auth))
			.catch((err) => setErrorText(getErrorMessage(err)))
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
						If you do not have an existing account, a fresh new account will be
						created based on your Google account info
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
								<Text>Sign in with Google</Text>
							</Button>
						)}
						onSuccess={onSuccess}
						onFailure={onFailure}
					/>

					<DemoLogin isLawyer={isLawyer} onLoginSuccess={onLoginSuccess} />
				</Flex>
			</Box>
		</Box>
	)
}
