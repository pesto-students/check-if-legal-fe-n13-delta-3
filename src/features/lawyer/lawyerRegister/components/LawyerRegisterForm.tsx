import { Box, Button, Flex, FormControl, Input, Stack, Textarea } from "@chakra-ui/react"
import { Select } from "chakra-react-select"
import { FC } from "react"
import { useForm } from "react-hook-form"
import { NavLink } from "react-router-dom"
import { cityLabel, getErrorMessage } from "../../../../utils/helpers"
import { useCityListQuery } from "../../../shared/city/cityList.query"
import { ICity } from "../../../shared/city/ICity"
import { InputLabel } from "../../../shared/components/ui/InputLabel"
import { useErrorToast } from "../../../shared/hooks/useErrorToast"
import { useSuccessToast } from "../../../shared/hooks/useSuccessToast"
import { useLawyerAuth } from "../../useLawyerAuth"
import { useLawyerStore } from "../../useLawyerStore"
import { lawyerRegisterApi } from "../lawyerRegisterApi"

interface IFormData {
	name: string
	cityId: number
	address: string
	description: string
	phone: string
}

export const LawyerRegisterForm: FC = () => {
	const { token } = useLawyerAuth()
	const errorToast = useErrorToast()
	const successToast = useSuccessToast()

	const { fetchLawyer } = useLawyerStore()
	const { data: cities } = useCityListQuery()
	const { register, handleSubmit, formState, setValue } = useForm<IFormData>()

	const onSubmit = handleSubmit((data) => {
		lawyerRegisterApi(data, token)
			.then(() => {
				successToast("Registered request sent successfully")
				fetchLawyer({ token })
			})
			.catch((err) => errorToast(getErrorMessage(err)))
	})

	return (
		<Box>
			<Stack>
				<form onSubmit={onSubmit}>
					<Flex direction={"column"} gridGap={4}>
						{/* Lawyer Name */}
						<FormControl>
							<InputLabel label="Full Name" suffixLabel="(Same as ID Proof)" />
							<Input isRequired autoFocus {...register("name")} />
						</FormControl>

						{/* Contact No */}
						<FormControl>
							<InputLabel label="Contact No" />
							<Input isRequired {...register("phone")} />
						</FormControl>

						{/* City */}
						<FormControl>
							<InputLabel label="City of Practising" />
							<Select<ICity, false>
								options={cities}
								getOptionLabel={(city) => cityLabel(city)}
								getOptionValue={(city) => `${city.id}`}
								onChange={(selected) =>
									selected && setValue("cityId", selected.id)
								}
							/>
						</FormControl>

						{/* Office Address */}
						<FormControl>
							<InputLabel label="Office Address" />
							<Textarea isRequired {...register("address")} />
						</FormControl>

						{/* Description */}
						<FormControl>
							<InputLabel label="About (Bio)" />
							<Textarea isRequired {...register("description")} />
						</FormControl>

						{/* Submit Button */}
						<Button
							colorScheme={"blue"}
							type="submit"
							width={"full"}
							isLoading={formState.isSubmitting}
							isDisabled={formState.isSubmitting}
						>
							Continue
						</Button>

						{/* Logout */}
						<NavLink to="/logout">
							<Button type="reset" width={"full"}>
								Logout
							</Button>
						</NavLink>
					</Flex>
				</form>
			</Stack>
		</Box>
	)
}
