import { FormControl, Input, Stack, Textarea } from "@chakra-ui/react"
import { Select } from "chakra-react-select"
import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import { DrawerForm } from "../../../shared/components/ui/DrawerForm"
import { ErrorText } from "../../../shared/components/ui/ErrorText"
import { InputLabel } from "../../../shared/components/ui/InputLabel"
import { useLanguageStore } from "../../../shared/language/useLanguageStore"
import { usePaperTypeStore } from "../../../shared/paperType/usePaperTypeStore"
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
	const { paperTypes } = usePaperTypeStore()
	const { languages } = useLanguageStore()
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
					<InputLabel label="Select Paper Type" />
					<Select<{ label: string; value: number }, false>
						options={paperTypeOptions}
						onChange={(selected) =>
							selected && setValue("paperTypeId", selected.value)
						}
						defaultValue={defaultPaperType}
						autoFocus
					/>
				</FormControl>
				{/* Paper Type */}
				<FormControl>
					<InputLabel label="Select Language" />
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
					<InputLabel label="Name" />
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