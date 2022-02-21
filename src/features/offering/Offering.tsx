import { Box, Flex } from "@chakra-ui/react"
import { FC, useEffect } from "react"
import { useCityListQuery } from "../shared/city/cityList.query"
import { useLanguageStore } from "../shared/language/useLanguageStore"
import { usePaperTypeStore } from "../shared/paperType/usePaperTypeStore"
import { FilterBox } from "./components/FilterBox"
import { OfferingFilterForm } from "./components/OfferingFilterForm"
import { OfferingList } from "./components/OfferingList"
import { useUserOfferingStore } from "./userOffering.store"

export const Offering: FC = () => {
	useCityListQuery()
	const { fetchPaperTypes } = usePaperTypeStore()
	const { fetchLanguages } = useLanguageStore()
	const { city, language, paperType } = useUserOfferingStore()

	useEffect(() => {
		fetchLanguages()
		fetchPaperTypes()
	}, [fetchLanguages, fetchPaperTypes])

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
