import {
	Box,
	Button,
	chakra,
	Container,
	Flex,
	Icon,
	SimpleGrid,
	VStack,
} from "@chakra-ui/react"
import { ComponentProps, FC } from "react"
import { NavLink } from "react-router-dom"

export const ForLawyerSection: FC = () => {
	return (
		<Container
			maxW={"6xl"}
			bg={"white"}
			justifyContent="center"
			alignItems="center"
			id="for-lawyer"
		>
			<Box bg={"white"} px={8} py={20} my={12} mx="auto">
				<SimpleGrid
					alignItems="center"
					columns={{ base: 1, lg: 2 }}
					spacingY={{ base: 10, lg: 32 }}
					spacingX={{ base: 10, lg: 24 }}
				>
					<Box>
						<chakra.h2
							mb={3}
							fontSize={{ base: "3xl", md: "4xl" }}
							fontWeight="extrabold"
							textAlign={{ base: "center", sm: "left" }}
							color={"black"}
							lineHeight="shorter"
							letterSpacing="tight"
						>
							Become a Partner
						</chakra.h2>
						<chakra.p
							mb={6}
							fontSize={{ base: "lg", md: "xl" }}
							textAlign={{ base: "center", sm: "left" }}
							color={"gray.600"}
						>
							Let's put our heads together to build a successful partnership to
							benefit both your customers and your business and profession.
						</chakra.p>
						<NavLink to={"/login?role=lawyer"}>
							<Button
								as="a"
								variant="solid"
								w={{ base: "full", sm: "auto" }}
								size="lg"
							>
								Register as a Lawyer
							</Button>
						</NavLink>
					</Box>
					<VStack direction="column" flexGrow={1} spacing={5} alignItems="start">
						<Feature>Clients from all over India</Feature>
						<Feature>Full Flexibility and Control</Feature>
						<Feature>Complete Transparency</Feature>
						<Feature>Low Commission Fee</Feature>
						<Feature>More Profitable</Feature>
					</VStack>
				</SimpleGrid>
			</Box>
		</Container>
	)
}

const Feature = (props: ComponentProps<typeof chakra.p>) => {
	return (
		<Flex>
			<Icon
				boxSize={5}
				mt={1}
				mr={2}
				color={"blue.500"}
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fillRule="evenodd"
					d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
					clipRule="evenodd"
				></path>
			</Icon>
			<chakra.p fontSize="lg" color={"gray.700"} {...props} />
		</Flex>
	)
}
