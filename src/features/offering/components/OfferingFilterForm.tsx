import { Box, Button, Center, FormControl, Heading, Stack } from "@chakra-ui/react"
import { Select } from "chakra-react-select"
import { FC } from "react"
import { cityLabel } from "../../../utils/helpers"
import { useCityListData } from "../../shared/city/cityList.query"
import { ICity } from "../../shared/city/ICity"
import { InputLabel } from "../../shared/components/ui/InputLabel"
import { ILanguage } from "../../shared/language/ILanguage"
import { useLanguageListData } from "../../shared/language/languageList.query"
import { IPaperType } from "../../shared/paperType/IPaperType"
import { usePaperTypeListData } from "../../shared/paperType/paperTypeList.query"
import { useUserOfferingStore } from "../userOffering.store"

export const OfferingFilterForm: FC = () => {
	const { data: cities } = useCityListData()
	const { data: languages } = useLanguageListData()
	const { data: paperTypes } = usePaperTypeListData()

	const setSelectedPaperType = useUserOfferingStore((st) => st.setPaperType)
	const setSelectedLanguage = useUserOfferingStore((st) => st.setLanguage)
	const setSelectedCity = useUserOfferingStore((st) => st.setCity)

	return (
		<Center>
			<Box
				bgColor={{ base: undefined, sm: "gray.50" }}
				mt={16}
				borderRadius="xl"
				px={10}
				py={5}
			>
				<Stack boxSize={"xs"}>
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
