import { FormControl, Input, Stack, Textarea } from "@chakra-ui/react"
import { Select } from "chakra-react-select"
import { FC } from "react"
import { useForm } from "react-hook-form"
import { cityLabel, getErrorMessage } from "../../../../utils/helpers"
import { useCityStore } from "../../../shared/city/useCityStore"
import { DrawerForm } from "../../../shared/components/ui/DrawerForm"
import { InputLabel } from "../../../shared/components/ui/InputLabel"
import { useErrorToast } from "../../../shared/hooks/useErrorToast"
import { useSuccessToast } from "../../../shared/hooks/useSuccessToast"
import { useLawyerAuth } from "../../useLawyerAuth"
import { useLawyerStore } from "../../useLawyerStore"
import { lawyerUpdateApi } from "./lawyerSelfUpdateApi"
import { useLawyerUpdateStore } from "./useLawyerUpdateStore"

interface IFormData {
	name: string
	cityId: number
	address: string
	description: string
	phone: string
}

export const LawyerDetailsUpdateDrawer: FC = () => {
	const { token } = useLawyerAuth()
	const errorToast = useErrorToast()
	const successToast = useSuccessToast()

	const { cities } = useCityStore()
	const { lawyer, fetchLawyer } = useLawyerStore()
	const { isDrawerOpen, setIsDrawerOpen } = useLawyerUpdateStore()

	const { register, handleSubmit, formState, setValue, reset } = useForm<IFormData>({
		defaultValues: {
			name: lawyer?.name,
			cityId: lawyer?.cityId,
			address: lawyer?.address,
			description: lawyer?.description,
			phone: lawyer?.phone,
		},
	})

	if (!lawyer || !cities) return null

	const onDrawerClose = () => {
		setIsDrawerOpen(false)
		reset()
	}

	const onSubmit = handleSubmit((data) => {
		lawyerUpdateApi(data, token)
			.then(() => {
				successToast("Updated successfully")
				onDrawerClose()
				fetchLawyer({ token })
			})
			.catch((error) => errorToast(getErrorMessage(error)))
	})

	const cityOptions = cities.map((el) => ({ label: cityLabel(el), value: el.id }))
	const defaultCity = cityOptions.find((el) => el.value === lawyer?.cityId)

	return (
		<DrawerForm
			size={"sm"}
			headingText="Update City"
			onSubmit={onSubmit}
			isSubmitting={formState.isSubmitting}
			submitLabel={"Save"}
			onClose={onDrawerClose}
			isOpen={isDrawerOpen}
		>
			<Stack maxWidth={"sm"} marginX={"auto"}>
				{/* Lawyer Name */}
				<FormControl>
					<InputLabel label="Full Name" suffixLabel="(Same as ID Proof)" />
					<Input
						isRequired
						autoFocus
						defaultValue={lawyer.name}
						{...register("name")}
					/>
				</FormControl>

				{/* Contact No */}
				<FormControl>
					<InputLabel label="Contact No" />
					<Input isRequired defaultValue={lawyer.phone} {...register("phone")} />
				</FormControl>

				{/* City */}
				<FormControl>
					<InputLabel label="City of Practising" />
					<Select<{ label: string; value: number }, false>
						options={cityOptions}
						defaultValue={defaultCity}
						onChange={(selected) => selected && setValue("cityId", selected.value)}
					/>
				</FormControl>

				{/* Office Address */}
				<FormControl>
					<InputLabel label="Office Address" />
					<Textarea
						isRequired
						defaultValue={lawyer.address}
						{...register("address")}
					/>
				</FormControl>

				{/* Description */}
				<FormControl>
					<InputLabel label="About (Bio)" />
					<Textarea
						isRequired
						defaultValue={lawyer.description ?? ""}
						{...register("description")}
					/>
				</FormControl>
			</Stack>
		</DrawerForm>
	)
}
