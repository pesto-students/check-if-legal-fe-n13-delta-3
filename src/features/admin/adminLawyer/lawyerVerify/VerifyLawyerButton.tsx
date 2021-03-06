import { Button, useToast } from "@chakra-ui/react"
import { FC, useCallback, useState } from "react"
import { getErrorMessage } from "../../../../utils/helpers"
import { useAdminAuth } from "../../useAdminAuth"
import { ILawyer } from "../../../lawyer/ILawyer"
import { useLawyerStore } from "../lawyerList/useLawyerStore"
import { lawyerVerifyApi } from "./lawyerVerifyApid"

export const VerifyLawyerButton: FC<{ lawyer: ILawyer }> = ({ lawyer }) => {
	const { token } = useAdminAuth()
	const toast = useToast()
	const { fetchLawyers } = useLawyerStore()
	const [isLoading, setIsLoading] = useState(false)

	const onClick = useCallback(() => {
		setIsLoading(true)
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
			.finally(() => setIsLoading(false))
	}, [fetchLawyers, lawyer, token, toast])

	return (
		<Button
			size={"xs"}
			colorScheme={"green"}
			onClick={onClick}
			isLoading={isLoading}
			isDisabled={isLoading}
		>
			Verify Now
		</Button>
	)
}
