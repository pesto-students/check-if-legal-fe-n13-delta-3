import { FormControl, Input, Stack } from "@chakra-ui/react"
import { Select } from "chakra-react-select"
import { ComponentProps, FC, useState } from "react"
import { useForm } from "react-hook-form"
import { useCityListData } from "../../../shared/city/cityList.query"
import { DrawerForm } from "../../../shared/components/ui/DrawerForm"
import { ErrorText } from "../../../shared/components/ui/ErrorText"
import { InputLabel } from "../../../shared/components/ui/InputLabel"
import { useStateListQuery } from "../../../shared/state/stateList.query"
import { useAdminAuth } from "../../useAdminAuth"
import { cityAddApi } from "./cityAddApi"

type IProps = Omit<ComponentProps<typeof DrawerForm>, "children">

interface IFormData {
	name: string
	stateId: number
}

export const CityAddDrawer: FC<IProps> = (props) => {
	const { token } = useAdminAuth()
	const { data: states } = useStateListQuery()
	const { refetch: refetchCities } = useCityListData()

	const { register, handleSubmit, formState, setValue, reset } = useForm<IFormData>({
		defaultValues: { name: "" },
	})
	const [errorText, setErrorText] = useState<string>()

	const onSubmit = handleSubmit((data) => {
		cityAddApi(data, token)
			.then(() => {
				props.onClose()
				reset()
				refetchCities()
			})
			.catch((err) =>
				setErrorText(err instanceof Error ? err.message : "Unknown Error"),
			)
	})

	if (!states) return null

	return (
		<DrawerForm
			size={"sm"}
			headingText="Add City"
			onSubmit={onSubmit}
			isSubmitting={formState.isSubmitting}
			submitLabel={"Save"}
			{...props}
		>
			<Stack maxWidth={"sm"} marginX={"auto"}>
				{/* Name */}
				<FormControl>
					<InputLabel label="Name" />
					<Input isRequired autoFocus {...register("name")} />
				</FormControl>

				{/* State Selection */}
				<FormControl>
					<InputLabel label="Select State" />
					<Select<{ label: string; value: number }, false>
						options={states.map((state) => ({
							label: state.name,
							value: state.id,
						}))}
						onChange={(selected) => selected && setValue("stateId", selected.value)}
					/>
				</FormControl>

				{errorText && <ErrorText text={errorText} />}
			</Stack>
		</DrawerForm>
	)
}
