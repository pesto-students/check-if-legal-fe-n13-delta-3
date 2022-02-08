import { ChakraProvider } from "@chakra-ui/react"
import { AppRouter } from "./AppRouter"

export function App() {
	return (
		<ChakraProvider>
			<AppRouter />
		</ChakraProvider>
	)
}
