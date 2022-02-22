import { FormControl, Input, Stack, Textarea } from "@chakra-ui/react"
import { Select } from "chakra-react-select"
import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import { DrawerForm } from "../../../shared/components/ui/DrawerForm"
import { ErrorText } from "../../../shared/components/ui/ErrorText"
import { InputLabel } from "../../../shared/components/ui/InputLabel"
import { useLanguageListData } from "../../../shared/language/languageList.query"
import { usePaperTypeListData } from "../../../shared/paperType/paperTypeList.query"
import { useVerifiedLawyerAuth } from "../../useVerifiedLawyerAuth"
import { useLawyerOfferingStore } from "../useLawyerOfferingStore"
import { offeringUpdateApi } from "./offeringUpdateApi"
import { useOfferingUpdateStore } from "./useOfferingUpdateStore"

interface IFormData {
	paperTypeId?: number
	languageId?: number
	expectedTimeInHours?: number
	price?: number
	description?: string | null
}

export const OfferingUpdateDrawer: FC = () => {
	const { token } = useVerifiedLawyerAuth()

	const { fetchOfferings } = useLawyerOfferingStore()
	const { data: paperTypes } = usePaperTypeListData()
	const { data: languages } = useLanguageListData()
	const { selectedOffering, isDrawerOpen, setIsDrawerOpen } = useOfferingUpdateStore()

	const [errorText, setErrorText] = useState<string>()
	const { register, handleSubmit, formState, setValue, reset } = useForm<IFormData>({
		defaultValues: {
			paperTypeId: selectedOffering?.paperTypeId,
			languageId: selectedOffering?.languageId,
			expectedTimeInHours: selectedOffering?.expectedTimeInHours,
			price: selectedOffering?.price,
			description: selectedOffering?.description,
		},
	})

	if (!paperTypes || !languages || !selectedOffering) return null

	const onDrawerClose = () => {
		setIsDrawerOpen(false)
		reset()
		setErrorText(undefined)
	}

	const onSubmit = handleSubmit((data) => {
		if (data.expectedTimeInHours) data.expectedTimeInHours = +data.expectedTimeInHours
		if (data.price) data.price = +data.price

		offeringUpdateApi({ ...data, id: selectedOffering.id }, token)
			.then(() => {
				reset()
				onDrawerClose()
				fetchOfferings({ token })
			})
			.catch((err) =>
				setErrorText(err instanceof Error ? err.message : "Unknown Error"),
			)
	})

	const paperTypeOptions = paperTypes.map((el) => ({ label: el.name, value: el.id }))
	const defaultPaperType = paperTypeOptions.find(
		(el) => el.value === selectedOffering?.paperTypeId,
	)

	const languagesOptions = languages.map((el) => ({ label: el.name, value: el.id }))
	const defaultLanguage = languagesOptions.find(
		(el) => el.value === selectedOffering?.languageId,
	)

	return (
		<DrawerForm
			size={"sm"}
			headingText="Update Offering"
			onSubmit={onSubmit}
			isSubmitting={formState.isSubmitting}
			submitLabel={"Save"}
			onClose={onDrawerClose}
			isOpen={isDrawerOpen}
		>
			<Stack maxWidth={"sm"} marginX={"auto"}>
				{/* Paper Type */}
				<FormControl>
					<InputLabel label="Paper Type" />
					<Select<{ label: string; value: number }, false>
						options={paperTypeOptions}
						onChange={(selected) =>
							selected && setValue("paperTypeId", selected.value)
						}
						defaultValue={defaultPaperType}
						autoFocus
					/>
				</FormControl>

				{/* Language */}
				<FormControl>
					<InputLabel label="Language" />
					<Select<{ label: string; value: number }, false>
						options={languagesOptions}
						onChange={(selected) =>
							selected && setValue("languageId", selected.value)
						}
						defaultValue={defaultLanguage}
					/>
				</FormControl>

				{/* Expected Duration */}
				<FormControl>
					<InputLabel label="Expected Duration (Hours)" />
					<Input
						type={"number"}
						defaultValue={selectedOffering.expectedTimeInHours}
						isRequired
						{...register("expectedTimeInHours")}
					/>
				</FormControl>

				{/* Price */}
				<FormControl>
					<InputLabel label="Price (INR)" />
					<Input
						type={"number"}
						isRequired
						defaultValue={selectedOffering.price}
						{...register("price")}
					/>
				</FormControl>

				{/* Description */}
				<FormControl>
					<InputLabel label="Description" />
					<Textarea
						defaultValue={selectedOffering.description ?? ""}
						{...register("description")}
					/>
				</FormControl>

				{errorText && <ErrorText text={errorText} />}
			</Stack>
		</DrawerForm>
	)
}
