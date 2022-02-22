import { useToast } from "@chakra-ui/react"
import { useCallback } from "react"

export function useSuccessToast() {
	const toast = useToast()

	const successToast = useCallback(
		(title: string, description?: string) => {
			toast({
				title,
				description,
				status: "success",
				position: "bottom-right",
				isClosable: true,
				duration: 4000,
			})
		},
		[toast],
	)

	return successToast
}
