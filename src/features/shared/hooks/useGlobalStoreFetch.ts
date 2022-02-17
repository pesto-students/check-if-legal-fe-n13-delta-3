import _ from "lodash"
import { useEffect } from "react"
import { useCityStore } from "../city/useCityStore"
import { useLanguageStore } from "../language/useLanguageStore"
import { usePaperTypeStore } from "../paperType/usePaperTypeStore"
import { useStateStore } from "../state/useStateStore"

export function useGlobalStoreFetch() {
	const { states, fetchStates } = useStateStore()
	const { cities, fetchCities } = useCityStore()
	const { paperTypes, fetchPaperTypes } = usePaperTypeStore()
	const { languages, fetchLanguages } = useLanguageStore()

	useEffect(() => {
		if (_.isUndefined(states)) fetchStates()
		if (_.isUndefined(cities)) fetchCities()
		if (_.isUndefined(paperTypes)) fetchPaperTypes()
		if (_.isUndefined(languages)) fetchLanguages()
	}, [
		states,
		fetchStates,
		cities,
		fetchCities,
		languages,
		fetchLanguages,
		paperTypes,
		fetchPaperTypes,
	])
}
