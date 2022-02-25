import {
	Box,
	Button,
	chakra,
	Container,
	Icon,
	Image,
	Stack,
	Text,
} from "@chakra-ui/react"
import { FC } from "react"

interface IProps {
	onOpen: () => void
}

export const HeroSection: FC<IProps> = ({ onOpen }) => {
	return (
		<Container maxW={"6xl"} py={24} mx="auto">
			<Box
				w={{ base: "full", md: 11 / 12, xl: 9 / 12 }}
				mx="auto"
				textAlign={"center"}
				mt={16}
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
					color={"gray.600"}
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
						onClick={onOpen}
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
				</Stack>
			</Box>
			<Box w={{ base: "full", md: 10 / 12 }} mx="auto" mt={20} textAlign="center">
				<Image
					w="full"
					rounded="lg"
					shadow="2xl"
					src="./assets/hero-image.png"
					alt="Check If Legal Hero Image"
				/>
			</Box>
		</Container>
	)
}
