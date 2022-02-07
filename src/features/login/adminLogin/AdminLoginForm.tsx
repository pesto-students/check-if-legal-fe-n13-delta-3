import { Box, Button, Flex, FormControl, Heading, Input, Stack } from "@chakra-ui/react"
import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { ErrorText } from "../../../components/ui/ErrorText"
import { InputLabel } from "../../../components/ui/InputLabel"
import { adminLoginApi } from "./adminLoginApi"

interface IFormData {
	username: string
	password: string
}

export const AdminLoginForm: FC = () => {
	const navigate = useNavigate()

	const { register, handleSubmit, formState } = useForm<IFormData>({
		defaultValues: { password: "", username: "" },
	})
	const [errorText, setErrorText] = useState<string>()

	const onSubmit = handleSubmit(async (data) => {
		try {
			await adminLoginApi(data)
			navigate("/admin")
		} catch (err) {
			setErrorText(err instanceof Error ? err.message : "Unknown Error")
		} finally {
			return
		}
	})

	return (
		<Box padding={10}>
			<Stack maxWidth={"sm"}>
				<Box textAlign={"center"}>
					<Heading as="h1" size="lg" color={"gray.700"}>
						Admin Login
					</Heading>
					<br />
				</Box>
				<form onSubmit={onSubmit}>
					<Flex direction={"column"} gridGap={"2"}>
						{/* Username */}
						<FormControl>
							<InputLabel label="Username" />
							<Input isRequired autoFocus {...register("username")} />
						</FormControl>

						{/* Password */}
						<FormControl>
							<InputLabel label="Password" />
							<Input type="password" isRequired {...register("password")} />
						</FormControl>
					</Flex>

					{errorText && <ErrorText text={errorText} />}

					<Box py="2">
						{/* Submit Button */}
						<Button
							colorScheme={"blue"}
							type="submit"
							width={"full"}
							isLoading={formState.isSubmitting}
							isDisabled={formState.isSubmitting}
						>
							Login
						</Button>
					</Box>
				</form>
			</Stack>
		</Box>
	)
}
