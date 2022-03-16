import { FormControl, Input, Stack, Textarea } from "@chakra-ui/react"
import { Select } from "chakra-react-select"
import { FC, useEffect } from "react"
import { useForm } from "react-hook-form"
import { getErrorMessage } from "../../../../utils/helpers"
import { useCityListQuery } from "../../../shared/city/cityList.query"
import { ICity } from "../../../shared/city/ICity"
import { DrawerForm } from "../../../shared/components/ui/DrawerForm"
import { InputLabel } from "../../../shared/components/ui/InputLabel"
import { useErrorToast } from "../../../shared/hooks/useErrorToast"
import { useSuccessToast } from "../../../shared/hooks/useSuccessToast"
import { ILawyer } from "../../ILawyer"
import { useLawyerData } from "../../lawyer.query"
import { useLawyerAuth } from "../../useLawyerAuth"
import { lawyerUpdateApi } from "./lawyerSelfUpdateApi"

interface IFormData {
	name: string
	cityId: number
	address: string
	description?: string
	phone: string
}

interface IProps {
	lawyer: ILawyer
	isOpen: boolean
	onClose: () => void
}

export const LawyerDetailsUpdateDrawer: FC<IProps> = ({ lawyer, isOpen, onClose }) => {
	const { token } = useLawyerAuth()
	const { refetch } = useLawyerData()
	const { data: cities } = useCityListQuery()

	const errorToast = useErrorToast()
	const successToast = useSuccessToast()
	const { register, handleSubmit, formState, setValue, reset } = useForm<IFormData>()

	useEffect(() => {
		setValue("name", lawyer.name)
		setValue("cityId", lawyer.cityId)
		setValue("address", lawyer.address)
		setValue("description", lawyer.description)
		setValue("phone", lawyer.phone)
	}, [setValue, lawyer])

	const onSubmit = handleSubmit(async (data) => {
		try {
			await lawyerUpdateApi(data, token)
			successToast("Updated successfully")
			onClose()
			reset()
			refetch()
		} catch (err) {
			errorToast(getErrorMessage(err))
		}
	})

	return (
		<DrawerForm
			size={"sm"}
			headingText="Update City"
			onSubmit={onSubmit}
			isSubmitting={formState.isSubmitting}
			submitLabel={"Save"}
			onClose={onClose}
			isOpen={isOpen}
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
					<InputLabel label="Mobile No" />
					<Input
						type={"tel"}
						isRequired
						maxLength={10}
						defaultValue={lawyer.phone}
						{...register("phone")}
					/>
				</FormControl>

				{/* City */}
				<FormControl>
					<InputLabel label="City of Practising" />
					<Select<ICity, false>
						options={cities}
						defaultValue={lawyer.city}
						getOptionLabel={(option) => option.name}
						getOptionValue={(city) => `${city.id}`}
						onChange={(selected) => selected && setValue("cityId", selected.id)}
					/>
				</FormControl>

				{/* Office Address */}
				<FormControl>
					<InputLabel label="Registered Address" />
					<Textarea
						isRequired
						defaultValue={lawyer.address}
						{...register("address")}
					/>
				</FormControl>

				{/* Description */}
				<FormControl>
					<InputLabel label="About" />
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
