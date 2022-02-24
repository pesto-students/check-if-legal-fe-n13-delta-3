import { FormControl, Stack } from "@chakra-ui/react"
import { Select } from "chakra-react-select"
import { FC } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { cityLabel } from "../../../utils/helpers"
import { useUserOfferingStore } from "../../offering/userOffering.store"
import { useCityListQuery } from "../city/cityList.query"
import { ICity } from "../city/ICity"
import { DrawerForm } from "../components/ui/DrawerForm"
import { InputLabel } from "../components/ui/InputLabel"
import { ILanguage } from "../language/ILanguage"
import { useLanguageListQuery } from "../language/languageList.query"
import { IPaperType } from "../paperType/IPaperType"
import { usePaperTypeListQuery } from "../paperType/paperTypeList.query"

interface IProps {
	isOpen: boolean
	onClose: () => void
}

interface IFormData {
	paperType: IPaperType
	language: ILanguage
	city: ICity
}

export const OfferingSearchForm: FC<IProps> = ({ isOpen, onClose }) => {
	const { data: cities, isLoading: isCitiesLoading } = useCityListQuery()
	const { data: languages, isLoading: isLanguagesLoading } = useLanguageListQuery()
	const { data: paperTypes, isLoading: isPaperTypesLoading } = usePaperTypeListQuery()

	const setSelectedPaperType = useUserOfferingStore((st) => st.setPaperType)
	const setSelectedLanguage = useUserOfferingStore((st) => st.setLanguage)
	const setSelectedCity = useUserOfferingStore((st) => st.setCity)

	const navigate = useNavigate()
	const { handleSubmit, setValue } = useForm<IFormData>()

	const onSubmit = handleSubmit((data) => {
		if (data.city && data.language && data.paperType) {
			setSelectedCity(data.city)
			setSelectedLanguage(data.language)
			setSelectedPaperType(data.paperType)

			onClose()
			navigate("/offering")
		}
	})

	return (
		<DrawerForm
			size={"sm"}
			headingText="Review Papers"
			onSubmit={onSubmit}
			submitLabel={"Continue"}
			onClose={onClose}
			isOpen={isOpen}
		>
			<Stack maxWidth={"sm"} marginX={"auto"}>
				{/* Paper Type Selection */}
				<FormControl>
					<InputLabel label="Select Paper Type" />
					<Select<IPaperType, false>
						options={paperTypes}
						isLoading={isPaperTypesLoading}
						getOptionValue={(option) => `${option.id}`}
						getOptionLabel={(option) => option.name}
						onChange={(selected) => selected && setValue("paperType", selected)}
					/>
				</FormControl>

				{/* Language Selection */}
				<FormControl>
					<InputLabel label="Select Language" />
					<Select<ILanguage, false>
						options={languages}
						isLoading={isLanguagesLoading}
						getOptionValue={(option) => `${option.id}`}
						getOptionLabel={(option) => option.name}
						onChange={(selected) => selected && setValue("language", selected)}
					/>
				</FormControl>

				{/* City Selection */}
				<FormControl>
					<InputLabel label="Select City" />
					<Select<ICity, false>
						options={cities}
						isLoading={isCitiesLoading}
						getOptionValue={(option) => `${option.id}`}
						getOptionLabel={(option) => cityLabel(option)}
						onChange={(selected) => selected && setValue("city", selected)}
					/>
				</FormControl>
			</Stack>
		</DrawerForm>
	)
}
