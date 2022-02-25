import { ChakraProvider } from "@chakra-ui/react"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { AppRouter } from "./AppRouter"
import { ErrorBoundary } from "react-error-boundary"
import { ErrorFallback } from "./features/shared/components/ui/ErrorFallback"

export function App() {
	const queryClient = new QueryClient()

	return (
		<ErrorBoundary FallbackComponent={ErrorFallback}>
			<QueryClientProvider client={queryClient}>
				<ChakraProvider>
					<AppRouter />
				</ChakraProvider>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</ErrorBoundary>
	)
}
