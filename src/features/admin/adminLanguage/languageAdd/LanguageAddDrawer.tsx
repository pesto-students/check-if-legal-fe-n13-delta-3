import { FormControl, Input, Stack } from "@chakra-ui/react"
import { ComponentProps, FC, useState } from "react"
import { useForm } from "react-hook-form"
import { DrawerForm } from "../../../../components/ui/DrawerForm"
import { ErrorText } from "../../../../components/ui/ErrorText"
import { InputLabel } from "../../../../components/ui/InputLabel"
import { useLanguageStore } from "../../../language/useLanguageStore"
import { useAdminAuth } from "../../useAdminAuth"
import { languageAddApi } from "./languageAddApi"

type IProps = Omit<ComponentProps<typeof DrawerForm>, "children">

interface IFormData {
	name: string
	stateId: number
}

export const LanguageAddDrawer: FC<IProps> = (props) => {
	const { token } = useAdminAuth()
	const fetchLanguages = useLanguageStore((state) => state.fetchLanguages)

	const [errorText, setErrorText] = useState<string>()
	const { register, handleSubmit, formState, reset } = useForm<IFormData>({
		defaultValues: { name: "" },
	})

	const onSubmit = handleSubmit((data) => {
		languageAddApi(data, token)
			.then(() => {
				props.onClose()
				reset()
				fetchLanguages()
			})
			.catch((err) =>
				setErrorText(err instanceof Error ? err.message : "Unknown Error"),
			)
	})

	return (
		<DrawerForm
			size={"sm"}
			headingText="Add Language"
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

				{errorText && <ErrorText text={errorText} />}
			</Stack>
		</DrawerForm>
	)
}
