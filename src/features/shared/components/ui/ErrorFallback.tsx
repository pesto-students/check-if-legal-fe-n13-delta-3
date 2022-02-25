import { FC } from "react"

interface IProps {
	error: Error
	resetErrorBoundary: () => void
}

export const ErrorFallback: FC<IProps> = ({ error, resetErrorBoundary }) => {
	return (
		<div role="alert" style={{ textAlign: "center" }}>
			<p>Something went wrong:</p>
			<pre>{error.message}</pre>
			<button onClick={resetErrorBoundary}>Try again</button>
			<br />
			<a href="/">
				<button>Go to Home</button>
			</a>
		</div>
	)
}
