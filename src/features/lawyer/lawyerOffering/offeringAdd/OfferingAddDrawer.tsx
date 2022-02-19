import { FormControl, Input, Stack, Textarea } from "@chakra-ui/react"
import { Select } from "chakra-react-select"
import { ComponentProps, FC, useState } from "react"
import { useForm } from "react-hook-form"
import { DrawerForm } from "../../../shared/components/ui/DrawerForm"
import { ErrorText } from "../../../shared/components/ui/ErrorText"
import { InputLabel } from "../../../shared/components/ui/InputLabel"
import { useLanguageStore } from "../../../shared/language/useLanguageStore"
import { usePaperTypeStore } from "../../../shared/paperType/usePaperTypeStore"
import { useVerifiedLawyerAuth } from "../../useVerifiedLawyerAuth"
import { useLawyerOfferingStore } from "../useLawyerOfferingStore"
import { offeringAddApi } from "./offeringAddApi"

type IProps = Omit<ComponentProps<typeof DrawerForm>, "children">

interface IFormData {
	paperTypeId: number
	languageId: number
	expectedTimeInHours: number
	price: number
	description?: string
}

export const OfferingAddDrawer: FC<IProps> = (props) => {
	const { token } = useVerifiedLawyerAuth()

	const { fetchOfferings } = useLawyerOfferingStore()
	const { paperTypes } = usePaperTypeStore()
	const { languages } = useLanguageStore()

	const { register, handleSubmit, formState, setValue, reset } = useForm<IFormData>()
	const [errorText, setErrorText] = useState<string>()

	const onSubmit = handleSubmit((data) => {
		data.price = +data.price
		data.expectedTimeInHours = +data.expectedTimeInHours

		offeringAddApi(data, token)
			.then(() => {
				props.onClose()
				reset()
				fetchOfferings({ token })
			})
			.catch((err) =>
				setErrorText(err instanceof Error ? err.message : "Unknown Error"),
			)
	})

	if (!paperTypes || !languages) return null

	return (
		<DrawerForm
			size={"sm"}
			headingText="Add Offering"
			onSubmit={onSubmit}
			isSubmitting={formState.isSubmitting}
			submitLabel={"Save"}
			{...props}
		>
			<Stack maxWidth={"sm"} marginX={"auto"}>
				{/* Paper Type */}
				<FormControl>
					<InputLabel label="Paper Type" />
					<Select<{ label: string; value: number }, false>
						options={paperTypes.map((el) => ({ label: el.name, value: el.id }))}
						onChange={(selected) =>
							selected && setValue("paperTypeId", selected.value)
						}
						autoFocus
					/>
				</FormControl>

				{/* Language */}
				<FormControl>
					<InputLabel label="Language" />
					<Select<{ label: string; value: number }, false>
						options={languages.map((el) => ({ label: el.name, value: el.id }))}
						onChange={(selected) =>
							selected && setValue("languageId", selected.value)
						}
					/>
				</FormControl>

				{/* Expected Duration */}
				<FormControl>
					<InputLabel label="Expected Duration (Hours)" />
					<Input type={"number"} isRequired {...register("expectedTimeInHours")} />
				</FormControl>

				{/* Price */}
				<FormControl>
					<InputLabel label="Price (INR)" />
					<Input type={"number"} isRequired {...register("price")} />
				</FormControl>

				{/* Description */}
				<FormControl>
					<InputLabel label="Description" />
					<Textarea {...register("description")} />
				</FormControl>

				{errorText && <ErrorText text={errorText} />}
			</Stack>
		</DrawerForm>
	)
}
