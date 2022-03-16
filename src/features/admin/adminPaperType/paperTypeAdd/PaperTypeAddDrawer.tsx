import { FormControl, Input, Stack } from "@chakra-ui/react"
import { ComponentProps, FC } from "react"
import { useForm } from "react-hook-form"
import { getErrorMessage } from "../../../../utils/helpers"
import { DrawerForm } from "../../../shared/components/ui/DrawerForm"
import { InputLabel } from "../../../shared/components/ui/InputLabel"
import { useErrorToast } from "../../../shared/hooks/useErrorToast"
import { usePaperTypeListData } from "../../../shared/paperType/paperTypeList.query"
import { useAdminAuth } from "../../useAdminAuth"
import { paperTypeAddApi } from "./paperTypeAddApi"

type IProps = Omit<ComponentProps<typeof DrawerForm>, "children">

interface IFormData {
	name: string
	stateId: number
}

export const PaperTypeAddDrawer: FC<IProps> = (props) => {
	const { token } = useAdminAuth()
	const { refetch: refetchPaperTypes } = usePaperTypeListData()

	const errorToast = useErrorToast()
	const { register, handleSubmit, formState, reset } = useForm<IFormData>({
		defaultValues: { name: "" },
	})

	const onSubmit = handleSubmit(async (data) => {
		try {
			await paperTypeAddApi(data, token)
			props.onClose()
			reset()
			refetchPaperTypes()
		} catch (err) {
			errorToast(getErrorMessage(err))
		}
	})

	return (
		<DrawerForm
			size={"sm"}
			headingText="Add Paper Type"
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
