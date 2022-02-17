import { FormControl, Input, Stack } from "@chakra-ui/react"
import { ComponentProps, FC, useState } from "react"
import { useForm } from "react-hook-form"
import { DrawerForm } from "../../../shared/components/ui/DrawerForm"
import { ErrorText } from "../../../shared/components/ui/ErrorText"
import { InputLabel } from "../../../shared/components/ui/InputLabel"
import { useVerifiedLawyerAuth } from "../../useVerifiedLawyerAuth"
import { useLawyerBankStore } from "../useLawyerBankStore"
import { bankAddApi } from "./bankAddApi"

type IProps = Omit<ComponentProps<typeof DrawerForm>, "children">

interface IFormData {
	bankName: string
	bankIfsc: string
	accountNumber: string
}

export const BankAddDrawer: FC<IProps> = (props) => {
	const { token } = useVerifiedLawyerAuth()
	const { fetchBanks } = useLawyerBankStore()

	const { register, handleSubmit, formState, reset } = useForm<IFormData>()
	const [errorText, setErrorText] = useState<string>()

	const onSubmit = handleSubmit((data) => {
		bankAddApi(data, token)
			.then(() => {
				props.onClose()
				reset()
				fetchBanks({ token })
			})
			.catch((err) =>
				setErrorText(err instanceof Error ? err.message : "Unknown Error"),
			)
	})

	return (
		<DrawerForm
			size={"sm"}
			headingText="Add Bank"
			onSubmit={onSubmit}
			isSubmitting={formState.isSubmitting}
			submitLabel={"Save"}
			{...props}
		>
			<Stack maxWidth={"sm"} marginX={"auto"}>
				{/* Bank Name */}
				<FormControl>
					<InputLabel label="Bank Name" />
					<Input isRequired {...register("bankName")} />
				</FormControl>

				{/* Bank IFSC */}
				<FormControl>
					<InputLabel label="Bank IFSC" />
					<Input isRequired {...register("bankIfsc")} />
				</FormControl>

				{/* Bank A/C No. */}
				<FormControl>
					<InputLabel label="Bank A/C No." />
					<Input isRequired {...register("accountNumber")} />
				</FormControl>

				{errorText && <ErrorText text={errorText} />}
			</Stack>
		</DrawerForm>
	)
}
