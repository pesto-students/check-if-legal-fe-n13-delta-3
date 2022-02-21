import { FormControl, Stack } from "@chakra-ui/react"
import { Select, SingleValue } from "chakra-react-select"
import { FC, useCallback } from "react"
import { cityLabel } from "../../../utils/helpers"
import { useCityStore } from "../../shared/city/useCityStore"
import { InputLabel } from "../../shared/components/ui/InputLabel"
import { useLanguageStore } from "../../shared/language/useLanguageStore"
import { usePaperTypeStore } from "../../shared/paperType/usePaperTypeStore"
import { useUserOfferingStore } from "../userOffering.store"

type ISelectOnChangeParam = SingleValue<{ label: string; value: number }>

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

	const paperTypeOptions =
		paperTypes?.map((el) => ({ label: el.name, value: el.id })) ?? []
	const defaultSelectedPaperType = paperTypeOptions.find(
		(el) => el.value === selectedPaperType?.id,
	)
	const onSelectedPaperTypeChange = useCallback(
		(selected: ISelectOnChangeParam) => {
			if (!selected) return
			const paperType = paperTypes?.find((el) => el.id === selected.value)
			if (!paperType) return
			setSelectedPaperType(paperType)
		},
		[paperTypes, setSelectedPaperType],
	)

	const languageOptions =
		languages?.map((el) => ({ label: el.name, value: el.id })) ?? []
	const defaultSelectedLanguage = languageOptions.find(
		(el) => el.value === selectedLanguage?.id,
	)
	const onSelectedLanguageChange = useCallback(
		(selected: ISelectOnChangeParam) => {
			if (!selected) return
			const language = languages?.find((el) => el.id === selected.value)
			if (!language) return
			setSelectedLanguage(language)
		},
		[languages, setSelectedLanguage],
	)

	const cityOptions = cities?.map((el) => ({ label: cityLabel(el), value: el.id })) ?? []
	const defaultSelectedCity = cityOptions.find((el) => el.value === selectedCity?.id)
	const onSelectedCityChange = useCallback(
		(selected: ISelectOnChangeParam) => {
			if (!selected) return
			const city = cities?.find((el) => el.id === selected.value)
			if (!city) return
			setSelectedCity(city)
		},
		[cities, setSelectedCity],
	)

	if (!selectedPaperType || !selectedLanguage || !selectedCity) return null

	return (
		<Stack>
			{/* Paper Type Selection */}
			<FormControl>
				<InputLabel label="Paper Type" />
				<Select<{ label: string; value: number }, false>
					options={paperTypeOptions}
					defaultValue={defaultSelectedPaperType}
					onChange={onSelectedPaperTypeChange}
				/>
			</FormControl>

			{/* Language Selection */}
			<FormControl>
				<InputLabel label="Language" />
				<Select<{ label: string; value: number }, false>
					options={languageOptions}
					defaultValue={defaultSelectedLanguage}
					onChange={onSelectedLanguageChange}
				/>
			</FormControl>

			{/* City Selection */}
			<FormControl>
				<InputLabel label="City" />
				<Select<{ label: string; value: number }, false>
					options={cityOptions}
					defaultValue={defaultSelectedCity}
					onChange={onSelectedCityChange}
				/>
			</FormControl>
		</Stack>
	)
}
