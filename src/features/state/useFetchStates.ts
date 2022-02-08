import { useCallback, useState } from "react"
import { IState } from "./IState"
import { stateListApi } from "./stateListApi"

export function useFetchStates() {
	const [states, setStates] = useState<IState[]>()
	const [isLoading, setIsLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState<string>()

	const fetchStates = useCallback(() => {
		setIsLoading(true)
		setErrorMessage(undefined)

		stateListApi()
			.then((states) => setStates(states))
			.catch((err) => {
				const message = err instanceof Error ? err.message : "Something went wrong"
				setErrorMessage(message)
			})
			.finally(() => setIsLoading(false))
	}, [])

	return { states, isLoading, errorMessage, fetchStates }
}
