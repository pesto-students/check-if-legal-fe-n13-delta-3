import { FormControl, Input, Stack } from "@chakra-ui/react"
import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import { DrawerForm } from "../../../shared/components/ui/DrawerForm"
import { ErrorText } from "../../../shared/components/ui/ErrorText"
import { InputLabel } from "../../../shared/components/ui/InputLabel"
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

	const [errorText, setErrorText] = useState<string>()
	const { register, handleSubmit, formState, reset } = useForm<IFormData>({
		defaultValues: { name: selectedLanguage?.name },
	})

	if (!selectedLanguage) return null

	const onDrawerClose = () => {
		setIsDrawerOpen(false)
		reset()
		setErrorText(undefined)
	}

	const onSubmit = handleSubmit((data) => {
		languageUpdateApi({ ...data, id: selectedLanguage.id }, token)
			.then(() => {
				onDrawerClose()
				refetchLanguages()
			})
			.catch((err) =>
				setErrorText(err instanceof Error ? err.message : "Unknown Error"),
			)
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

				{errorText && <ErrorText text={errorText} />}
			</Stack>
		</DrawerForm>
	)
}
