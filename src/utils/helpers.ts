export function getErrorMessage(err: unknown) {
	if (err instanceof Error) return err.message
	return "Unknown Error"
}
