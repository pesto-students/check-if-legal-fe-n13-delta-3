import { Box, Button, Center, FormControl, Heading, Stack } from "@chakra-ui/react"
import { Select } from "chakra-react-select"
import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import { useCityStore } from "../../shared/city/useCityStore"
import { CenteredSpinner } from "../../shared/components/ui/CenterSpinner"
import { ErrorText } from "../../shared/components/ui/ErrorText"
import { InputLabel } from "../../shared/components/ui/InputLabel"
import { useLanguageStore } from "../../shared/language/useLanguageStore"
import { usePaperTypeStore } from "../../shared/paperType/usePaperTypeStore"
import { useOfferingStore } from "../useOfferingStore"

interface IFormData {
	cityId: number
	paperTypeId: number
	languageId: number
}

export const OfferingFilterForm: FC = () => {
	const { cities } = useCityStore()
	const { languages } = useLanguageStore()
	const { paperTypes } = usePaperTypeStore()
	const { setCityId, setLanguageId, setPaperTypeId } = useOfferingStore()

	const [errorText, setErrorText] = useState<string>()
	const { handleSubmit, formState, setValue } = useForm<IFormData>({
		defaultValues: { cityId: undefined, paperTypeId: undefined, languageId: undefined },
	})

	const onSubmit = handleSubmit(({ cityId, languageId, paperTypeId }) => {
		const isFilterFilled = cityId && paperTypeId && languageId
		if (!isFilterFilled) {
			setErrorText("Fill all the field to continue")
			return
		}

		setCityId(cityId)
		setLanguageId(languageId)
		setPaperTypeId(paperTypeId)
	})

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
					<form onSubmit={onSubmit}>
						<Stack>
							{/* Paper Type Selection */}
							<FormControl>
								<InputLabel label="Select Paper Type" />
								<Select<{ label: string; value: number }, false>
									options={paperTypes.map((el) => ({
										label: el.name,
										value: el.id,
									}))}
									onChange={(selected) =>
										selected && setValue("paperTypeId", selected.value)
									}
								/>
							</FormControl>

							{/* Language Selection */}
							<FormControl>
								<InputLabel label="Select Language" />
								<Select<{ label: string; value: number }, false>
									options={languages.map((el) => ({
										label: el.name,
										value: el.id,
									}))}
									onChange={(selected) =>
										selected && setValue("languageId", selected.value)
									}
								/>
							</FormControl>

							{/* City Selection */}
							<FormControl>
								<InputLabel label="Select City" />
								<Select<{ label: string; value: number }, false>
									options={cities.map((el) => ({
										label: el.name,
										value: el.id,
									}))}
									onChange={(selected) =>
										selected && setValue("cityId", selected.value)
									}
								/>
							</FormControl>

							{errorText && <ErrorText text={errorText} />}

							<Box py="2">
								{/* Submit Button */}
								<Button
									colorScheme={"blue"}
									type="submit"
									width={"full"}
									isLoading={formState.isSubmitting}
									isDisabled={formState.isSubmitting}
								>
									Continue
								</Button>
							</Box>
						</Stack>
					</form>
				</Stack>
			</Box>
		</Center>
	)
}
