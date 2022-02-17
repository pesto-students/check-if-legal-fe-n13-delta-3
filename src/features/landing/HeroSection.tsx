import {
	Box,
	Button,
	chakra,
	Container,
	Icon,
	Image,
	Stack,
	Text,
	useColorModeValue,
} from "@chakra-ui/react"
import { NavLink } from "react-router-dom"

export const HeroSection = () => {
	return (
		<Container maxW={"6xl"} py={24} mx="auto">
			<Box
				w={{ base: "full", md: 11 / 12, xl: 9 / 12 }}
				mx="auto"
				textAlign={"center"}
			>
				<chakra.h1
					mb={6}
					fontSize={{ base: "4xl", md: "6xl" }}
					fontWeight="bold"
					lineHeight="none"
					letterSpacing={{ base: "normal", md: "tight" }}
					color={"gray.900"}
				>
					Verify{" "}
					<Text
						display={"inline"}
						w="full"
						bgClip="text"
						bgGradient="linear(to-r, green.400,purple.500)"
						fontWeight="extrabold"
					>
						legal papers
					</Text>{" "}
					online by verified and expert lawyers
				</chakra.h1>
				<chakra.p
					px={{ base: 0, lg: 24 }}
					mb={6}
					fontSize={{ base: "lg", md: "xl" }}
					color={useColorModeValue("gray.600", "gray.300")}
				>
					Check if Legal is a online legal paper verification platform, where you are
					allowed to select from expert and verified lawyers based on your city.
				</chakra.p>
				<Stack
					direction={{ base: "column", sm: "row" }}
					mb={{ base: 4, md: 8 }}
					spacing={2}
					justifyContent={"center"}
				>
					<NavLink to="/offering">
						<Button
							as="a"
							variant="solid"
							display="inline-flex"
							alignItems="center"
							justifyContent="center"
							w={{ base: "full", sm: "auto" }}
							mb={{ base: 2, sm: 0 }}
							size="lg"
							cursor="pointer"
						>
							Verify Papers Now
							<Icon boxSize={4} ml={1} viewBox="0 0 20 20" fill="currentColor">
								<path
									fillRule="evenodd"
									d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
									clipRule="evenodd"
								/>
							</Icon>
						</Button>
					</NavLink>
				</Stack>
			</Box>
			<Box w={{ base: "full", md: 10 / 12 }} mx="auto" mt={20} textAlign="center">
				<Image
					w="full"
					rounded="lg"
					shadow="2xl"
					src="https://kutty.netlify.app/hero.jpg"
					alt="Hellonext feedback boards software screenshot"
				/>
			</Box>
		</Container>
	)
}
