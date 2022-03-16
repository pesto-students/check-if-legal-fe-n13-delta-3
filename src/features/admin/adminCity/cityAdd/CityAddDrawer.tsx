import { FormControl, Input, Stack } from "@chakra-ui/react"
import { Select } from "chakra-react-select"
import { ComponentProps, FC } from "react"
import { useForm } from "react-hook-form"
import { getErrorMessage } from "../../../../utils/helpers"
import { useCityListData } from "../../../shared/city/cityList.query"
import { DrawerForm } from "../../../shared/components/ui/DrawerForm"
import { InputLabel } from "../../../shared/components/ui/InputLabel"
import { useErrorToast } from "../../../shared/hooks/useErrorToast"
import { useSuccessToast } from "../../../shared/hooks/useSuccessToast"
import { IState } from "../../../shared/state/IState"
import { useStateListQuery } from "../../../shared/state/stateList.query"
import { useAdminAuth } from "../../useAdminAuth"
import { apiCityAdd } from "./cityAdd.api"

type IProps = Omit<ComponentProps<typeof DrawerForm>, "children">

interface IFormData {
	name: string
	stateId: number
}

export const CityAddDrawer: FC<IProps> = (props) => {
	const { token } = useAdminAuth()
	const { data: states } = useStateListQuery()
	const { refetch: refetchCities } = useCityListData()

	const errorToast = useErrorToast()
	const successToast = useSuccessToast()
	const { register, handleSubmit, formState, setValue, reset } = useForm<IFormData>({
		defaultValues: { name: "" },
	})

	const onSubmit = handleSubmit(async (data) => {
		try {
			await apiCityAdd(data, token)
			successToast("City added successfully")
			props.onClose()
			reset()

			refetchCities()
		} catch (err) {
			errorToast(getErrorMessage(err))
		}
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
					<Select<IState, false>
						options={states}
						getOptionLabel={(option) => option.name}
						getOptionValue={(option) => `${option.id}`}
						onChange={(selected) => selected && setValue("stateId", selected.id)}
					/>
				</FormControl>
			</Stack>
		</DrawerForm>
	)
}
