import { FormControl, Input, Stack } from "@chakra-ui/react"
import { ComponentProps, FC, useEffect } from "react"
import { useForm } from "react-hook-form"
import { getErrorMessage } from "../../../../utils/helpers"
import { DrawerForm } from "../../../shared/components/ui/DrawerForm"
import { InputLabel } from "../../../shared/components/ui/InputLabel"
import { useErrorToast } from "../../../shared/hooks/useErrorToast"
import { useSuccessToast } from "../../../shared/hooks/useSuccessToast"
import { useVerifiedLawyerAuth } from "../../useVerifiedLawyerAuth"
import { useLawyerBankData } from "./lawyerBank.query"
import { apiLawyerBankUpsert } from "./lawyerBankUpsert.api"

type IProps = Omit<ComponentProps<typeof DrawerForm>, "children">

interface IFormData {
	bankName: string
	bankIfsc: string
	accountNumber: string
}

export const BankUpdateDrawer: FC<IProps> = (props) => {
	const { token } = useVerifiedLawyerAuth()
	const { data, refetch: refetchBankDetails } = useLawyerBankData()

	const { register, handleSubmit, formState, reset, setValue } = useForm<IFormData>()
	const errorToast = useErrorToast()
	const successToast = useSuccessToast()

	useEffect(() => {
		if (data) {
			setValue("bankName", data.bankName)
			setValue("bankIfsc", data.bankIfsc)
			setValue("accountNumber", data.accountNumber)
		}
	})

	const onSubmit = handleSubmit((data) => {
		apiLawyerBankUpsert(data, token)
			.then(() => {
				successToast("Bank details updated successfully")
				props.onClose()
				reset()
				refetchBankDetails()
			})
			.catch((err) => errorToast(getErrorMessage(err)))
	})

	return (
		<DrawerForm
			size={"sm"}
			headingText="Bank Details"
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
			</Stack>
		</DrawerForm>
	)
}
