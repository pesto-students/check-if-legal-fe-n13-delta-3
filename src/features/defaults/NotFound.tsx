import { Box, Heading, Text, Button } from "@chakra-ui/react"
import { NavLink } from "react-router-dom"

export const NotFound = () => {
	return (
		<Box textAlign="center" py={10} px={6}>
			<Heading display="inline-block" as="h2" size="2xl" color={"blue.500"}>
				404
			</Heading>
			<Text fontSize="18px" mt={3} mb={2}>
				Page Not Found
			</Text>
			<Text color={"gray.500"} mb={6}>
				The page you're looking for does not seem to exist
			</Text>

			<NavLink to="/">
				<Button colorScheme="blue">Go to Home</Button>
			</NavLink>
		</Box>
	)
}
