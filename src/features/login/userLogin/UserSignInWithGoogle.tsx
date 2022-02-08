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
import { useNavigate } from "react-router-dom"
import { ErrorText } from "../../../components/ui/ErrorText"
import { Title } from "../../../components/ui/Title"
import { GOOGLE_CLIENT_ID } from "../../../configs"
import { userGoogleAuthApi } from "./userGoogleAuthApi"

export const UserSignInWithGoogle: FC = () => {
	const [isLawyer, setIsLawyer] = useState(false)
	const [errorText, setErrorText] = useState<string>()
	const navigate = useNavigate()

	const onSuccess = async (response: any) => {
		try {
			const { tokenId } = response as GoogleLoginResponse
			const { role } = await userGoogleAuthApi({ idToken: tokenId, isLawyer })
			navigate(`/${role}`)
		} catch (err) {
			setErrorText(err instanceof Error ? err.message : "Unknown Error")
		}
	}

	const onFailure = (error: any) => {
		setErrorText(error)
		console.log(error)
	}

	return (
		<Box textAlign={"center"}>
			<Box width={"lg"} bgColor={"gray.100"} p={4} borderRadius={"lg"}>
				<Flex direction={"column"} gap={4}>
					<Title p={4}>Sign in to your Account</Title>
					<Text mt={8} mb={2}>
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
								w={"full"}
								backgroundColor={"white"}
								variant={"outline"}
								leftIcon={<FcGoogle />}
								onClick={renderProps.onClick}
								disabled={renderProps.disabled}
							>
								<Center>
									<Text>Sign in with Google</Text>
								</Center>
							</Button>
						)}
						buttonText="Login"
						cookiePolicy={"single_host_origin"}
						onSuccess={onSuccess}
						onFailure={onFailure}
					/>
				</Flex>
			</Box>
		</Box>
	)
}
