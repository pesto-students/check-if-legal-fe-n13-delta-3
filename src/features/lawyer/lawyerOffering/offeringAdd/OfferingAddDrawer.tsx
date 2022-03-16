import { FormControl, Input, Stack, Textarea } from "@chakra-ui/react"
import { Select } from "chakra-react-select"
import { ComponentProps, FC } from "react"
import { useForm } from "react-hook-form"
import { getErrorMessage } from "../../../../utils/helpers"
import { DrawerForm } from "../../../shared/components/ui/DrawerForm"
import { InputLabel } from "../../../shared/components/ui/InputLabel"
import { useErrorToast } from "../../../shared/hooks/useErrorToast"
import { useSuccessToast } from "../../../shared/hooks/useSuccessToast"
import { ILanguage } from "../../../shared/language/ILanguage"
import { useLanguageListQuery } from "../../../shared/language/languageList.query"
import { IPaperType } from "../../../shared/paperType/IPaperType"
import { usePaperTypeListQuery } from "../../../shared/paperType/paperTypeList.query"
import { useVerifiedLawyerAuth } from "../../useVerifiedLawyerAuth"
import { useLawyerOfferingStore } from "../useLawyerOfferingStore"
import { offeringAddApi } from "./offeringAddApi"

type IProps = Omit<ComponentProps<typeof DrawerForm>, "children">

interface IFormData {
	paperTypeId: number
	languageId: number
	expectedTimeInHours: string
	price: string
	description?: string
}

export const OfferingAddDrawer: FC<IProps> = (props) => {
	const { token } = useVerifiedLawyerAuth()

	const { fetchOfferings } = useLawyerOfferingStore()
	const { data: paperTypes } = usePaperTypeListQuery()
	const { data: languages } = useLanguageListQuery()

	const { register, handleSubmit, formState, setValue, reset } = useForm<IFormData>()
	const errorToast = useErrorToast()
	const successToast = useSuccessToast()

	const onSubmit = handleSubmit(async (data) => {
		try {
			const payload = {
				...data,
				price: +data.price,
				expectedTimeInHours: +data.expectedTimeInHours,
			}

			await offeringAddApi(payload, token)
			successToast("Offering added successfully")
			props.onClose()
			reset()

			fetchOfferings({ token })
		} catch (err) {
			errorToast(getErrorMessage(err))
		}
	})

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
					<Select<IPaperType, false>
						autoFocus
						options={paperTypes}
						getOptionValue={(option) => `${option.id}`}
						getOptionLabel={(option) => option.name}
						onChange={(selected) =>
							selected && setValue("paperTypeId", selected.id)
						}
					/>
				</FormControl>

				{/* Language */}
				<FormControl>
					<InputLabel label="Language" />
					<Select<ILanguage, false>
						options={languages}
						getOptionValue={(option) => `${option.id}`}
						getOptionLabel={(option) => option.name}
						onChange={(selected) => selected && setValue("languageId", selected.id)}
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
			</Stack>
		</DrawerForm>
	)
}
