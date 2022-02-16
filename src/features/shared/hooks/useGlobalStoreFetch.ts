import _ from "lodash"
import { useEffect } from "react"
import { useCityStore } from "../city/useCityStore"
import { useStateStore } from "../state/useStateStore"

export function useGlobalStoreFetch() {
	const { states, fetchStates } = useStateStore()
	const { cities, fetchCities } = useCityStore()

	useEffect(() => {
		if (_.isUndefined(states)) fetchStates()
		if (_.isUndefined(cities)) fetchCities()
	}, [states, fetchStates, cities, fetchCities])
}
