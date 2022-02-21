import { FormControl, Heading, Stack } from "@chakra-ui/react"
import { Select } from "chakra-react-select"
import { FC } from "react"
import { cityLabel } from "../../../utils/helpers"
import { ICity } from "../../shared/city/ICity"
import { useCityStore } from "../../shared/city/useCityStore"
import { InputLabel } from "../../shared/components/ui/InputLabel"
import { ILanguage } from "../../shared/language/ILanguage"
import { useLanguageStore } from "../../shared/language/useLanguageStore"
import { IPaperType } from "../../shared/paperType/IPaperType"
import { usePaperTypeStore } from "../../shared/paperType/usePaperTypeStore"
import { useUserOfferingStore } from "../userOffering.store"

export const FilterBox: FC = () => {
	const { paperTypes } = usePaperTypeStore()
	const { languages } = useLanguageStore()
	const { cities } = useCityStore()

	const selectedPaperType = useUserOfferingStore((st) => st.paperType)
	const setSelectedPaperType = useUserOfferingStore((st) => st.setPaperType)
	const selectedLanguage = useUserOfferingStore((st) => st.language)
	const setSelectedLanguage = useUserOfferingStore((st) => st.setLanguage)
	const selectedCity = useUserOfferingStore((st) => st.city)
	const setSelectedCity = useUserOfferingStore((st) => st.setCity)

	if (!selectedPaperType || !selectedLanguage || !selectedCity) return null

	return (
		<Stack bgColor={"gray.50"} p={4} borderRadius="lg" m={2}>
			<Heading size={"md"}>Filters</Heading>

			{/* Paper Type Selection */}
			<FormControl>
				<InputLabel label="Paper Type" />
				<Select<IPaperType, false>
					options={paperTypes}
					defaultValue={selectedPaperType}
					getOptionValue={(option) => `${option.id}`}
					getOptionLabel={(option) => option.name}
					onChange={(selected) => selected && setSelectedPaperType(selected)}
				/>
			</FormControl>

			{/* Language Selection */}
			<FormControl>
				<InputLabel label="Language" />
				<Select<ILanguage, false>
					options={languages}
					defaultValue={selectedLanguage}
					getOptionValue={(option) => `${option.id}`}
					getOptionLabel={(option) => option.name}
					onChange={(selected) => selected && setSelectedLanguage(selected)}
				/>
			</FormControl>

			{/* City Selection */}
			<FormControl>
				<InputLabel label="City" />
				<Select<ICity, false>
					options={cities}
					defaultValue={selectedCity}
					getOptionValue={(option) => `${option.id}`}
					getOptionLabel={(option) => cityLabel(option)}
					onChange={(selected) => selected && setSelectedCity(selected)}
				/>
			</FormControl>
		</Stack>
	)
}
