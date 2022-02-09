import { Button, useToast } from "@chakra-ui/react"
import { FC } from "react"
import { getErrorMessage } from "../../../../utils/helpers"
import { useAdminAuth } from "../../useAdminAuth"
import { ILawyer } from "../lawyerList/ILawyer"
import { useLawyerStore } from "../lawyerList/useLawyerStore"
import { lawyerVerifyApi } from "./lawyerVerifyApid"

export const VerifyLawyerButton: FC<{ lawyer: ILawyer }> = ({ lawyer }) => {
	const { token } = useAdminAuth()
	const toast = useToast()
	const { fetchLawyers } = useLawyerStore()

	const onClick = () => {
		lawyerVerifyApi({ id: lawyer.id }, token)
			.then(() => fetchLawyers({ token }))
			.catch((err) => {
				const message = getErrorMessage(err)
				toast({
					title: `Unable to verify lawyer: ${lawyer.name}`,
					description: message,
					status: "error",
					duration: 5000,
					isClosable: true,
				})
			})
	}

	return (
		<Button size={"xs"} colorScheme={"green"} onClick={onClick}>
			Verify Now
		</Button>
	)
}
