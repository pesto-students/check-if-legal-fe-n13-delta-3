import { Box, Button, Flex } from "@chakra-ui/react"
import { FC } from "react"
import { NavLink } from "react-router-dom"
import { useCityListQuery } from "../shared/city/cityList.query"
import { useLanguageListQuery } from "../shared/language/languageList.query"
import { usePaperTypeListQuery } from "../shared/paperType/paperTypeList.query"
import { FilterBox } from "./components/FilterBox"
import { OfferingFilterForm } from "./components/OfferingFilterForm"
import { OfferingList } from "./components/OfferingList"
import { useUserOfferingStore } from "./userOffering.store"

export const Offering: FC = () => {
	useCityListQuery()
	usePaperTypeListQuery()
	useLanguageListQuery()
	const { city, language, paperType } = useUserOfferingStore()

	const isFilterFilled = Boolean(city && language && paperType)
	if (!isFilterFilled) return <OfferingFilterForm />

	return (
		<Flex gap={"4"} p={{ base: 2, md: 8 }} direction={{ base: "column", lg: "row" }}>
			<Box flex={"2"}>
				<NavLink to={"/"}>
					<Button m={2}>Go Back Home</Button>
				</NavLink>
				<FilterBox />
			</Box>
			<Box flex={"5"}>
				<OfferingList />
			</Box>
		</Flex>
	)
}
