import { Box, Button, Center, Flex } from "@chakra-ui/react"
import { FC } from "react"
import { NavLink } from "react-router-dom"

export const LoginLayout: FC = ({ children }) => {
	return (
		<Box>
			<Center p={8}>
				<Flex direction={"column"} gap={6}>
					<Box
						bg={"gray.100"}
						rounded={"xl"}
						p={{ base: 4, sm: 6, md: 8 }}
						maxW={{ lg: "lg" }}
					>
						{children}
					</Box>
					<Box textAlign={"center"}>
						<NavLink to="/">
							<Button>Go Back to Home</Button>
						</NavLink>
					</Box>
				</Flex>
			</Center>
		</Box>
	)
}
