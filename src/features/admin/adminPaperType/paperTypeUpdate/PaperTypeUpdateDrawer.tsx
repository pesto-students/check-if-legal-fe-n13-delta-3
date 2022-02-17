import { FormControl, Input, Stack } from "@chakra-ui/react"
import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import { DrawerForm } from "../../../shared/components/ui/DrawerForm"
import { ErrorText } from "../../../shared/components/ui/ErrorText"
import { InputLabel } from "../../../shared/components/ui/InputLabel"
import { usePaperTypeStore } from "../../../shared/paperType/usePaperTypeStore"
import { useAdminAuth } from "../../useAdminAuth"
import { paperTypeUpdateApi } from "./paperTypeUpdateApi"
import { usePaperTypeUpdateStore } from "./usePaperTypeUpdateStore"

interface IFormData {
	name: string
}

export const PaperTypeUpdateDrawer: FC = () => {
	const { token } = useAdminAuth()

	const fetchPaperTypes = usePaperTypeStore((state) => state.fetchPaperTypes)
	const { selectedPaperType, isDrawerOpen, setIsDrawerOpen } = usePaperTypeUpdateStore()

	const [errorText, setErrorText] = useState<string>()
	const { register, handleSubmit, formState, reset } = useForm<IFormData>({
		defaultValues: { name: selectedPaperType?.name },
	})

	if (!selectedPaperType) return null

	const onDrawerClose = () => {
		setIsDrawerOpen(false)
		reset()
		setErrorText(undefined)
	}

	const onSubmit = handleSubmit((data) => {
		paperTypeUpdateApi({ ...data, id: selectedPaperType.id }, token)
			.then(() => {
				onDrawerClose()
				fetchPaperTypes()
			})
			.catch((err) =>
				setErrorText(err instanceof Error ? err.message : "Unknown Error"),
			)
	})

	return (
		<DrawerForm
			size={"sm"}
			headingText="Update Paper Type"
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
						defaultValue={selectedPaperType.name}
						{...register("name")}
					/>
				</FormControl>

				{errorText && <ErrorText text={errorText} />}
			</Stack>
		</DrawerForm>
	)
}
