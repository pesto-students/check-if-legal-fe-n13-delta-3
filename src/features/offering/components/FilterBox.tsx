import { FormControl, Stack } from "@chakra-ui/react"
import { Select } from "chakra-react-select"
import { FC } from "react"
import { cityLabel } from "../../../utils/helpers"
import { useCityStore } from "../../shared/city/useCityStore"
import { InputLabel } from "../../shared/components/ui/InputLabel"
import { useLanguageStore } from "../../shared/language/useLanguageStore"
import { usePaperTypeStore } from "../../shared/paperType/usePaperTypeStore"
import { useOfferingStore } from "../useOfferingStore"

export const FilterBox: FC = () => {
	const { paperTypeId, setPaperTypeId, languageId, setLanguageId, cityId, setCityId } =
		useOfferingStore()
	const { paperTypes } = usePaperTypeStore()
	const { languages } = useLanguageStore()
	const { cities } = useCityStore()

	if (!paperTypes || !paperTypeId || !languages || !languageId || !cityId || !cities)
		return null

	const defaultPaperType = paperTypes.find((el) => el.id === paperTypeId)
	const defaultLanguage = languages.find((el) => el.id === languageId)
	const defaultCity = cities.find((el) => el.id === cityId)

	return (
		<Stack>
			{/* Paper Type Selection */}
			<FormControl>
				<InputLabel label="Paper Type" />
				<Select<{ label: string; value: number }, false>
					options={paperTypes.map((el) => ({ label: el.name, value: el.id }))}
					defaultValue={{
						label: defaultPaperType?.name ?? "Select Paper Type",
						value: paperTypeId,
					}}
					onChange={(selected) => selected && setPaperTypeId(selected.value)}
				/>
			</FormControl>

			{/* Language Selection */}
			<FormControl>
				<InputLabel label="Language" />
				<Select<{ label: string; value: number }, false>
					options={languages.map((el) => ({ label: el.name, value: el.id }))}
					defaultValue={{
						label: defaultLanguage?.name ?? "Select Language",
						value: languageId,
					}}
					onChange={(selected) => selected && setLanguageId(selected.value)}
				/>
			</FormControl>

			{/* City Selection */}
			<FormControl>
				<InputLabel label="City" />
				<Select<{ label: string; value: number }, false>
					options={cities.map((el) => ({
						label: cityLabel(el),
						value: el.id,
					}))}
					defaultValue={{
						label: defaultCity ? cityLabel(defaultCity) : "Select City",
						value: cityId,
					}}
					onChange={(selected) => selected && setCityId(selected.value)}
				/>
			</FormControl>
		</Stack>
	)
}
