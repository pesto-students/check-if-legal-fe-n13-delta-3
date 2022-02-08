import { useCallback, useState } from "react"
import { cityListApi } from "./cityListApi"
import { ICity } from "./ICity"

export function useFetchCities() {
	const [cities, setCities] = useState<ICity[]>()
	const [isLoading, setIsLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState<string>()

	const fetchCities = useCallback(() => {
		setIsLoading(true)
		setErrorMessage(undefined)

		cityListApi()
			.then((cities) => setCities(cities))
			.catch((err) => {
				const message = err instanceof Error ? err.message : "Something went wrong"
				setErrorMessage(message)
			})
			.finally(() => setIsLoading(false))
	}, [])

	return { cities, isLoading, errorMessage, fetchCities }
}
