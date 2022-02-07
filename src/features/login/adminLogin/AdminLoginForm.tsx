import { Box, Button, Flex, FormControl, Heading, Input, Stack } from "@chakra-ui/react"
import { FC } from "react"
import { useForm } from "react-hook-form"
import { InputLabel } from "../../../components/ui/InputLabel"

interface IFormData {
	username: string
	password: string
}

export const AdminLoginForm: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<IFormData>({
		defaultValues: { password: "", username: "" },
	})

	const onSubmit = handleSubmit((data) => {
		console.log(data)
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

					<Box py="2">
						{/* Submit Button */}
						<Button
							colorScheme={"blue"}
							type="submit"
							width={"full"}
							isLoading={isSubmitting}
							isDisabled={isSubmitting}
						>
							Login
						</Button>
					</Box>
				</form>
			</Stack>
		</Box>
	)
}
