import { FormControl, Input, Stack } from "@chakra-ui/react"
import { Select } from "chakra-react-select"
import { FC, useEffect } from "react"
import { useForm } from "react-hook-form"
import { getErrorMessage } from "../../../../utils/helpers"
import { useCityListData } from "../../../shared/city/cityList.query"
import { ICity } from "../../../shared/city/ICity"
import { DrawerForm } from "../../../shared/components/ui/DrawerForm"
import { InputLabel } from "../../../shared/components/ui/InputLabel"
import { useErrorToast } from "../../../shared/hooks/useErrorToast"
import { useSuccessToast } from "../../../shared/hooks/useSuccessToast"
import { IState } from "../../../shared/state/IState"
import { useStateListQuery } from "../../../shared/state/stateList.query"
import { useAdminAuth } from "../../useAdminAuth"
import { apiCityUpdate } from "./cityUpdate.api"

interface IFormData {
	name: string
	stateId: number
}

interface IProps {
	city: ICity
	isOpen: boolean
	onClose: () => void
}

export const CityUpdateDrawer: FC<IProps> = ({ city, isOpen, onClose }) => {
	const { token } = useAdminAuth()

	const { data: states } = useStateListQuery()
	const { refetch: refetchCities } = useCityListData()

	const { register, handleSubmit, formState, setValue, reset } = useForm<IFormData>()
	const errorToast = useErrorToast()
	const successToast = useSuccessToast()

	useEffect(() => {
		setValue("name", city.name)
		setValue("stateId", city.stateId)
	}, [city, setValue])

	const onSubmit = handleSubmit(async (data) => {
		try {
			await apiCityUpdate({ id: city.id }, data, token)
			successToast("City updated successfully")
			onClose()
			reset()

			refetchCities()
		} catch (err) {
			errorToast(getErrorMessage(err))
		}
	})

	return (
		<DrawerForm
			size={"sm"}
			headingText="Update City"
			onSubmit={onSubmit}
			isSubmitting={formState.isSubmitting}
			submitLabel={"Save"}
			onClose={onClose}
			isOpen={isOpen}
		>
			<Stack maxWidth={"sm"} marginX={"auto"}>
				{/* Name */}
				<FormControl>
					<InputLabel label="Name" />
					<Input
						isRequired
						autoFocus
						defaultValue={city.name}
						{...register("name")}
					/>
				</FormControl>

				{/* State */}
				<FormControl>
					<InputLabel label="Select State" />
					<Select<IState, false>
						options={states}
						defaultValue={city.state}
						getOptionLabel={(option) => option.name}
						getOptionValue={(option) => `${option.id}`}
						onChange={(selected) => selected && setValue("stateId", selected.id)}
					/>
				</FormControl>
			</Stack>
		</DrawerForm>
	)
}
