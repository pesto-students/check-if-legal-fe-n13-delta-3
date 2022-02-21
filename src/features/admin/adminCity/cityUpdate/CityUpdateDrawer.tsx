import { FormControl, Input, Stack } from "@chakra-ui/react"
import { Select } from "chakra-react-select"
import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import { useCityListData } from "../../../shared/city/cityList.query"
import { DrawerForm } from "../../../shared/components/ui/DrawerForm"
import { ErrorText } from "../../../shared/components/ui/ErrorText"
import { InputLabel } from "../../../shared/components/ui/InputLabel"
import { useStateStore } from "../../../shared/state/useStateStore"
import { useAdminAuth } from "../../useAdminAuth"
import { cityUpdateApi } from "./cityUpdateApi"
import { useCityUpdateStore } from "./useCityUpdateStore"

interface IFormData {
	name: string
	stateId: number
}

export const CityUpdateDrawer: FC = () => {
	const { token } = useAdminAuth()

	const states = useStateStore((state) => state.states)
	const { refetch: refetchCities } = useCityListData()
	const { selectedCity, isDrawerOpen, setIsDrawerOpen } = useCityUpdateStore()

	const [errorText, setErrorText] = useState<string>()
	const { register, handleSubmit, formState, setValue, reset } = useForm<IFormData>({
		defaultValues: { name: selectedCity?.name, stateId: selectedCity?.stateId },
	})

	if (!states || !selectedCity) return null

	const onDrawerClose = () => {
		setIsDrawerOpen(false)
		reset()
		setErrorText(undefined)
	}

	const onSubmit = handleSubmit((data) => {
		cityUpdateApi({ ...data, id: selectedCity.id }, token)
			.then(() => {
				onDrawerClose()
				refetchCities()
			})
			.catch((err) =>
				setErrorText(err instanceof Error ? err.message : "Unknown Error"),
			)
	})

	const stateOptions = states.map((state) => ({ label: state.name, value: state.id }))

	return (
		<DrawerForm
			size={"sm"}
			headingText="Update City"
			onSubmit={onSubmit}
			isSubmitting={formState.isSubmitting}
			submitLabel={"Save"}
			onClose={onDrawerClose}
			isOpen={isDrawerOpen}
		>
			<Stack maxWidth={"sm"} marginX={"auto"}>
				{/* Name */}
				<FormControl>
					<InputLabel label="Name" />
					<Input
						isRequired
						autoFocus
						defaultValue={selectedCity.name}
						{...register("name")}
					/>
				</FormControl>

				{/* Name */}
				<FormControl>
					<InputLabel label="Select State" />
					<Select<{ label: string; value: number }, false>
						options={stateOptions}
						defaultValue={stateOptions.find(
							(el) => el.value === selectedCity.stateId,
						)}
						onChange={(selected) => selected && setValue("stateId", selected.value)}
					/>
				</FormControl>

				{errorText && <ErrorText text={errorText} />}
			</Stack>
		</DrawerForm>
	)
}
