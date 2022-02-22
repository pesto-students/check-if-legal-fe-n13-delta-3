import { useToast } from "@chakra-ui/react"
import { useCallback } from "react"

export function useErrorToast() {
	const toast = useToast()

	const errorToast = useCallback(
		(error: string | Error) => {
			const message = typeof error === "string" ? error : error.message
			toast({
				title: message,
				status: "error",
				position: "bottom-right",
				isClosable: true,
				duration: 4000,
			})
		},
		[toast],
	)

	return errorToast
}
