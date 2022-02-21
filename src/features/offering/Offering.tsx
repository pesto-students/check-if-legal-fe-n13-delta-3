import { Box, Flex } from "@chakra-ui/react"
import { FC, useEffect } from "react"
import { useCityStore } from "../shared/city/useCityStore"
import { useLanguageStore } from "../shared/language/useLanguageStore"
import { usePaperTypeStore } from "../shared/paperType/usePaperTypeStore"
import { FilterBox } from "./components/FilterBox"
import { OfferingFilterForm } from "./components/OfferingFilterForm"
import { OfferingList } from "./components/OfferingList"
import { useUserOfferingStore } from "./userOffering.store"

export const Offering: FC = () => {
	const { fetchPaperTypes } = usePaperTypeStore()
	const { fetchLanguages } = useLanguageStore()
	const { fetchCities } = useCityStore()
	const { city, language, paperType } = useUserOfferingStore()

	useEffect(() => {
		fetchCities()
		fetchLanguages()
		fetchPaperTypes()
	}, [fetchCities, fetchLanguages, fetchPaperTypes])

	const isFilterFilled = Boolean(city && language && paperType)
	if (!isFilterFilled) return <OfferingFilterForm />

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
