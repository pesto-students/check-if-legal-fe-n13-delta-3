import { FormControl, Input, Stack } from "@chakra-ui/react"
import { ComponentProps, FC, useState } from "react"
import { useForm } from "react-hook-form"
import { DrawerForm } from "../../../../components/ui/DrawerForm"
import { ErrorText } from "../../../../components/ui/ErrorText"
import { InputLabel } from "../../../../components/ui/InputLabel"
import { IState } from "../../../state/IState"
import { cityAddApi } from "./cityAddApi"
import { Select } from "chakra-react-select"
import { useAdminAuth } from "../../useAdminAuth"

type IProps = Omit<ComponentProps<typeof DrawerForm>, "children"> & {
	states: IState[]
	onSuccess?: () => void
}

interface IFormData {
	name: string
	stateId: number
}

export const CityAddDrawer: FC<IProps> = ({ states, onSuccess, ...rest }) => {
	const { token } = useAdminAuth()
	const { register, handleSubmit, formState, setValue } = useForm<IFormData>({
		defaultValues: { name: "" },
	})
	const [errorText, setErrorText] = useState<string>()

	const onSubmit = handleSubmit(async (data) => {
		try {
			await cityAddApi(data, token)
			onSuccess && onSuccess()
			rest.onClose()
		} catch (err) {
			setErrorText(err instanceof Error ? err.message : "Unknown Error")
		}
	})

	return (
		<DrawerForm
			size={"sm"}
			headingText="Add City"
			onSubmit={onSubmit}
			isSubmitting={formState.isSubmitting}
			submitLabel={"Save"}
			{...rest}
		>
			<Stack maxWidth={"sm"} marginX={"auto"}>
				{/* Name */}
				<FormControl>
					<InputLabel label="Name" />
					<Input isRequired autoFocus {...register("name")} />
				</FormControl>
				{/* Name */}
				<FormControl>
					<InputLabel label="Select State" />
					<Select<{ label: string; value: number }, false>
						options={states.map((state) => ({
							label: state.name,
							value: state.id,
						}))}
						onChange={(selected) => {
							selected && setValue("stateId", selected.value)
						}}
					/>
				</FormControl>

				{errorText && <ErrorText text={errorText} />}
			</Stack>
		</DrawerForm>
	)
}
