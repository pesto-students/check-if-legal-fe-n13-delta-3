import { FormControl, Input, Stack } from "@chakra-ui/react"
import { ComponentProps, FC } from "react"
import { useForm } from "react-hook-form"
import { getErrorMessage } from "../../../../utils/helpers"
import { DrawerForm } from "../../../shared/components/ui/DrawerForm"
import { InputLabel } from "../../../shared/components/ui/InputLabel"
import { useErrorToast } from "../../../shared/hooks/useErrorToast"
import { useLanguageListData } from "../../../shared/language/languageList.query"
import { useAdminAuth } from "../../useAdminAuth"
import { languageAddApi } from "./languageAddApi"

type IProps = Omit<ComponentProps<typeof DrawerForm>, "children">

interface IFormData {
	name: string
	stateId: number
}

export const LanguageAddDrawer: FC<IProps> = (props) => {
	const { token } = useAdminAuth()
	const { refetch: refetchLanguages } = useLanguageListData()

	const errorToast = useErrorToast()
	const { register, handleSubmit, formState, reset } = useForm<IFormData>({
		defaultValues: { name: "" },
	})

	const onSubmit = handleSubmit(async (data) => {
		try {
			await languageAddApi(data, token)
			props.onClose()
			reset()
			refetchLanguages()
		} catch (err) {
			errorToast(getErrorMessage(err))
		}
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
			</Stack>
		</DrawerForm>
	)
}
