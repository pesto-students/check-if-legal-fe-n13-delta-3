import { FormControl, Input, Stack } from "@chakra-ui/react"
import { FC } from "react"
import { useForm } from "react-hook-form"
import { getErrorMessage } from "../../../../utils/helpers"
import { DrawerForm } from "../../../shared/components/ui/DrawerForm"
import { InputLabel } from "../../../shared/components/ui/InputLabel"
import { useErrorToast } from "../../../shared/hooks/useErrorToast"
import { useLanguageListData } from "../../../shared/language/languageList.query"
import { useAdminAuth } from "../../useAdminAuth"
import { languageUpdateApi } from "./languageUpdateApi"
import { useLanguageUpdateStore } from "./useLanguageUpdateStore"

interface IFormData {
	name: string
}

export const LanguageUpdateDrawer: FC = () => {
	const { token } = useAdminAuth()

	const { refetch: refetchLanguages } = useLanguageListData()
	const { selectedLanguage, isDrawerOpen, setIsDrawerOpen } = useLanguageUpdateStore()

	const errorToast = useErrorToast()
	const { register, handleSubmit, formState, reset } = useForm<IFormData>({
		defaultValues: { name: selectedLanguage?.name },
	})

	if (!selectedLanguage) return null

	const onDrawerClose = () => {
		setIsDrawerOpen(false)
		reset()
	}

	const onSubmit = handleSubmit(async (data) => {
		try {
			await languageUpdateApi({ ...data, id: selectedLanguage.id }, token)
			onDrawerClose()
			refetchLanguages()
		} catch (err) {
			errorToast(getErrorMessage(err))
		}
	})

	return (
		<DrawerForm
			size={"sm"}
			headingText="Update Language"
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
						defaultValue={selectedLanguage.name}
						{...register("name")}
					/>
				</FormControl>
			</Stack>
		</DrawerForm>
	)
}
