import { Box, Button, Center, Flex, Img } from "@chakra-ui/react"
import { FC } from "react"
import { NavLink } from "react-router-dom"

export const LoginLayout: FC = ({ children }) => {
	return (
		<Box mt={16}>
			<Center>
				<Flex direction={"column"} alignItems="center" gap={6}>
					<Box>
						<Img src={"/assets/logo-dark.png"} alt={"logo"} height={"30px"} />
					</Box>
					<Box
						bg={{ base: undefined, sm: "gray.100" }}
						rounded={"xl"}
						p={{ base: 4, sm: 6, md: 8 }}
						maxW={{ base: "sm", sm: "lg" }}
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
