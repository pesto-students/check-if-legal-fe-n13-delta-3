import { Box, Button, Flex, FormControl, Input, Stack, Textarea } from "@chakra-ui/react"
import { Select } from "chakra-react-select"
import { FC } from "react"
import { useForm } from "react-hook-form"
import { NavLink, useNavigate } from "react-router-dom"
import { cityLabel, getErrorMessage } from "../../../../utils/helpers"
import { useCityStore } from "../../../shared/city/useCityStore"
import { InputLabel } from "../../../shared/components/ui/InputLabel"
import { useErrorToast } from "../../../shared/hooks/useErrorToast"
import { useSuccessToast } from "../../../shared/hooks/useSuccessToast"
import { useLawyerAuth } from "../../useLawyerAuth"
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
	const navigate = useNavigate()
	const errorToast = useErrorToast()
	const successToast = useSuccessToast()

	const { cities } = useCityStore()
	const { register, handleSubmit, formState, setValue } = useForm<IFormData>()

	const onSubmit = handleSubmit((data) => {
		lawyerRegisterApi(data, token)
			.then(() => {
				successToast("Registered request sent successfully")
				navigate("/lawyer/status")
			})
			.catch((err) => errorToast(getErrorMessage(err)))
	})

	if (!cities) return null
	const cityOptions = cities.map((el) => ({ label: cityLabel(el), value: el.id }))

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
							<Select<{ label: string; value: number }, false>
								options={cityOptions}
								onChange={(selected) =>
									selected && setValue("cityId", selected.value)
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
