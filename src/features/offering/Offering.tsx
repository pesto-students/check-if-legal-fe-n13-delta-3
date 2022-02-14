import { FC, useEffect } from "react"
import { useCityStore } from "../shared/city/useCityStore"
import { useLanguageStore } from "../shared/language/useLanguageStore"
import { usePaperTypeStore } from "../shared/paperType/usePaperTypeStore"
import { OfferingFilterForm } from "./OfferingFilterForm"
import { OfferingSelection } from "./OfferingSelection"
import { useOfferingStore } from "./useOfferingStore"

export const Offering: FC = () => {
	const { fetchPaperTypes } = usePaperTypeStore()
	const { fetchLanguages } = useLanguageStore()
	const { fetchCities } = useCityStore()
	const { cityId, languageId, paperTypeId } = useOfferingStore()

	useEffect(() => {
		fetchCities()
		fetchLanguages()
		fetchPaperTypes()
	}, [fetchCities, fetchLanguages, fetchPaperTypes])

	const isOfferingFilterFilled = cityId && languageId && paperTypeId

	if (isOfferingFilterFilled) return <OfferingSelection />
	return <OfferingFilterForm />
}
