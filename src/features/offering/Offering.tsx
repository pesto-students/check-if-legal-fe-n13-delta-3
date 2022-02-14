import { Box, Flex } from "@chakra-ui/react"
import { FC, useEffect } from "react"
import { storage } from "../../utils/storage"
import { useCityStore } from "../shared/city/useCityStore"
import { useLanguageStore } from "../shared/language/useLanguageStore"
import { usePaperTypeStore } from "../shared/paperType/usePaperTypeStore"
import { FilterBox } from "./components/FilterBox"
import { OfferingFilterForm } from "./components/OfferingFilterForm"
import { OfferingList } from "./components/OfferingList"
import { useOfferingStore } from "./useOfferingStore"

export const Offering: FC = () => {
	const authPayload = storage.getAuth()
	const token = authPayload?.token

	const { fetchPaperTypes } = usePaperTypeStore()
	const { fetchLanguages } = useLanguageStore()
	const { fetchCities } = useCityStore()
	const { cityId, languageId, paperTypeId, fetchOfferings } = useOfferingStore()

	useEffect(() => {
		fetchCities()
		fetchLanguages()
		fetchPaperTypes()

		if (cityId && languageId && paperTypeId) {
			fetchOfferings({ token })
		}
	}, [
		fetchCities,
		fetchLanguages,
		fetchPaperTypes,
		fetchOfferings,
		cityId,
		languageId,
		paperTypeId,
		token,
	])

	const isOfferingFilterFilled = cityId && languageId && paperTypeId

	if (!isOfferingFilterFilled) return <OfferingFilterForm />
	return (
		<Flex gap={"4"} p={"8"}>
			<Box flex={"1"}>
				<FilterBox />
			</Box>
			<Box flex={"3"}>
				<OfferingList />
			</Box>
		</Flex>
	)
}
