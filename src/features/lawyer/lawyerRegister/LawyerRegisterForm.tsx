import {
	Box,
	Button,
	Flex,
	FormControl,
	Heading,
	Input,
	Stack,
	Textarea,
} from "@chakra-ui/react"
import { Select } from "chakra-react-select"
import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import { NavLink, useNavigate } from "react-router-dom"
import { cityLabel, getErrorMessage } from "../../../utils/helpers"
import { useCityStore } from "../../shared/city/useCityStore"
import { ErrorText } from "../../shared/components/ui/ErrorText"
import { InputLabel } from "../../shared/components/ui/InputLabel"
import { useLawyerAuth } from "../useLawyerAuth"
import { lawyerRegisterApi } from "./lawyerRegisterApi"

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
	const { cities } = useCityStore()

	const { register, handleSubmit, formState, setValue } = useForm<IFormData>()
	const [errorText, setErrorText] = useState<string>()

	const onSubmit = handleSubmit(async (data) => {
		try {
			setErrorText(undefined)
			await lawyerRegisterApi(data, token)
			navigate("/lawyer/status")
		} catch (err) {
			setErrorText(getErrorMessage(err))
		}
	})

	if (!cities) return null

	return (
		<Box padding={10}>
			<Stack maxWidth={"sm"}>
				<Box textAlign={"center"}>
					<Heading as="h1" size="lg" color={"gray.700"}>
						Lawyer Registration
					</Heading>
					<br />
				</Box>
				<form onSubmit={onSubmit}>
					<Flex direction={"column"} gridGap={"2"} width={"md"}>
						{/* Lawyer Name */}
						<FormControl>
							<InputLabel label="Name" />
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
								options={cities.map((el) => ({
									label: cityLabel(el),
									value: el.id,
								}))}
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
					</Flex>

					{errorText && <ErrorText text={errorText} />}

					<Flex width={"md"} justifyContent="space-between">
						<Box mt="3">
							{/* GoBack Button */}
							<NavLink to="/logout">
								<Button type="reset" width={"full"}>
									Logout
								</Button>
							</NavLink>
						</Box>
						<Box mt="3">
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
						</Box>
					</Flex>
				</form>
			</Stack>
		</Box>
	)
}
