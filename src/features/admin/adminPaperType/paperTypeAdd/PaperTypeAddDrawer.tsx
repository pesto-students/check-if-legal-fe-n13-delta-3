import { FormControl, Input, Stack } from "@chakra-ui/react"
import { ComponentProps, FC, useState } from "react"
import { useForm } from "react-hook-form"
import { DrawerForm } from "../../../shared/components/ui/DrawerForm"
import { ErrorText } from "../../../shared/components/ui/ErrorText"
import { InputLabel } from "../../../shared/components/ui/InputLabel"
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

	const { register, handleSubmit, formState, reset } = useForm<IFormData>({
		defaultValues: { name: "" },
	})
	const [errorText, setErrorText] = useState<string>()

	const onSubmit = handleSubmit((data) => {
		paperTypeAddApi(data, token)
			.then(() => {
				props.onClose()
				reset()
				refetchPaperTypes()
			})
			.catch((err) =>
				setErrorText(err instanceof Error ? err.message : "Unknown Error"),
			)
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

				{errorText && <ErrorText text={errorText} />}
			</Stack>
		</DrawerForm>
	)
}
