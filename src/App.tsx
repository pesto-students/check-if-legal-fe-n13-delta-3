import { ChakraProvider } from "@chakra-ui/react"
import { AppRouter } from "./AppRouter"
import { useGlobalStoreFetch } from "./features/shared/hooks/useGlobalStoreFetch"

export function App() {
	useGlobalStoreFetch()

	return (
		<ChakraProvider>
			<AppRouter />
		</ChakraProvider>
	)
}
