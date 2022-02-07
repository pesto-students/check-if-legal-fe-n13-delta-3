import { Center } from "@chakra-ui/react"
import { FC } from "react"
import { UserSignInWithGoogle } from "./UserSignInWithGoogle"

export const UserLogin: FC = () => {
	return (
		<Center mt={"32"}>
			<UserSignInWithGoogle />
		</Center>
	)
}
