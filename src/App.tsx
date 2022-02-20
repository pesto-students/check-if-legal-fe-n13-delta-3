import { ChakraProvider } from "@chakra-ui/react"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { AppRouter } from "./AppRouter"

export function App() {
	const queryClient = new QueryClient()

	return (
		<QueryClientProvider client={queryClient}>
			<ChakraProvider>
				<AppRouter />
			</ChakraProvider>
			{/* The rest of your application */}
			7 <ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}
