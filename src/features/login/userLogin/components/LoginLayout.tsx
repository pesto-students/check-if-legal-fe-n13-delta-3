import { Box, Button, Center, Flex, Img } from "@chakra-ui/react"
import { FC } from "react"
import { NavLink } from "react-router-dom"

export const LoginLayout: FC = ({ children }) => {
	return (
		<Box>
			<Center p={8}>
				<Flex direction={"column"} alignItems="center" gap={6}>
					<Box>
						<Img src={"/assets/logo-dark.png"} alt={"logo"} height={"30px"} />
					</Box>
					<Box
						bg={"gray.100"}
						rounded={"xl"}
						p={{ base: 4, sm: 6, md: 8 }}
						maxW={{ lg: "lg" }}
					>
						{children}
					</Box>
					<Box>
						<NavLink to="/">
							<Button>Go Back to Home</Button>
						</NavLink>
					</Box>
				</Flex>
			</Center>
		</Box>
	)
}
