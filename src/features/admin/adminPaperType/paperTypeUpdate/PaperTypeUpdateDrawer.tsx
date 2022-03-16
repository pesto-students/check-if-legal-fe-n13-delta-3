import { FormControl, Input, Stack } from "@chakra-ui/react"
import { FC, useCallback } from "react"
import { useForm } from "react-hook-form"
import { getErrorMessage } from "../../../../utils/helpers"
import { DrawerForm } from "../../../shared/components/ui/DrawerForm"
import { InputLabel } from "../../../shared/components/ui/InputLabel"
import { useErrorToast } from "../../../shared/hooks/useErrorToast"
import { usePaperTypeListData } from "../../../shared/paperType/paperTypeList.query"
import { useAdminAuth } from "../../useAdminAuth"
import { paperTypeUpdateApi } from "./paperTypeUpdateApi"
import { usePaperTypeUpdateStore } from "./usePaperTypeUpdateStore"

interface IFormData {
	name: string
}

export const PaperTypeUpdateDrawer: FC = () => {
	const { token } = useAdminAuth()
	const { refetch: refetchPaperTypes } = usePaperTypeListData()
	const { selectedPaperType, isDrawerOpen, setIsDrawerOpen } = usePaperTypeUpdateStore()

	const errorToast = useErrorToast()
	const { register, handleSubmit, formState, reset } = useForm<IFormData>({
		defaultValues: { name: selectedPaperType?.name },
	})

	const onDrawerClose = useCallback(() => {
		setIsDrawerOpen(false)
		reset()
	}, [setIsDrawerOpen, reset])

	if (!selectedPaperType) return null

	const onSubmit = handleSubmit(async (data) => {
		try {
			await paperTypeUpdateApi({ ...data, id: selectedPaperType.id }, token)
			onDrawerClose()
			refetchPaperTypes()
		} catch (err) {
			errorToast(getErrorMessage(err))
		}
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
			</Stack>
		</DrawerForm>
	)
}
