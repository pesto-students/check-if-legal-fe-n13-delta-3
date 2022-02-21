import { Box, Button, Center, FormControl, Heading, Stack } from "@chakra-ui/react"
import { Select } from "chakra-react-select"
import { FC } from "react"
import { cityLabel } from "../../../utils/helpers"
import { ICity } from "../../shared/city/ICity"
import { useCityStore } from "../../shared/city/useCityStore"
import { CenteredSpinner } from "../../shared/components/ui/CenterSpinner"
import { InputLabel } from "../../shared/components/ui/InputLabel"
import { ILanguage } from "../../shared/language/ILanguage"
import { useLanguageStore } from "../../shared/language/useLanguageStore"
import { IPaperType } from "../../shared/paperType/IPaperType"
import { usePaperTypeStore } from "../../shared/paperType/usePaperTypeStore"
import { useUserOfferingStore } from "../userOffering.store"

export const OfferingFilterForm: FC = () => {
	const { cities } = useCityStore()
	const { languages } = useLanguageStore()
	const { paperTypes } = usePaperTypeStore()

	const setSelectedPaperType = useUserOfferingStore((st) => st.setPaperType)
	const setSelectedLanguage = useUserOfferingStore((st) => st.setLanguage)
	const setSelectedCity = useUserOfferingStore((st) => st.setCity)

	if (!cities || !languages || !paperTypes) return <CenteredSpinner />

	return (
		<Center>
			<Box padding={10}>
				<Stack boxSize={"sm"}>
					<Box textAlign={"center"}>
						<Heading as="h1" size="lg" color={"gray.700"}>
							Review Legal Papers
						</Heading>
						<br />
					</Box>
					<Stack>
						{/* Paper Type Selection */}
						<FormControl>
							<InputLabel label="Select Paper Type" />
							<Select<IPaperType, false>
								options={paperTypes}
								getOptionValue={(option) => `${option.id}`}
								getOptionLabel={(option) => option.name}
								onChange={(selected) =>
									selected && setSelectedPaperType(selected)
								}
							/>
						</FormControl>

						{/* Language Selection */}
						<FormControl>
							<InputLabel label="Select Language" />
							<Select<ILanguage, false>
								options={languages}
								getOptionValue={(option) => `${option.id}`}
								getOptionLabel={(option) => option.name}
								onChange={(selected) => selected && setSelectedLanguage(selected)}
							/>
						</FormControl>

						{/* City Selection */}
						<FormControl>
							<InputLabel label="Select City" />
							<Select<ICity, false>
								options={cities}
								getOptionValue={(option) => `${option.id}`}
								getOptionLabel={(option) => cityLabel(option)}
								onChange={(selected) => selected && setSelectedCity(selected)}
							/>
						</FormControl>

						<Box py="2">
							{/* Submit Button */}
							<Button colorScheme={"blue"} width={"full"}>
								Continue
							</Button>
						</Box>
					</Stack>
				</Stack>
			</Box>
		</Center>
	)
}
