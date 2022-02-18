import { Center } from "@chakra-ui/react"
import { FC } from "react"
import { LoginLayout } from "./LoginLayout"
import { UserSignInWithGoogle } from "./UserSignInWithGoogle"

export const UserLogin: FC = () => {
	return (
		<Center mt={"32"}>
			<LoginLayout>
				<UserSignInWithGoogle />
			</LoginLayout>
		</Center>
	)
}
