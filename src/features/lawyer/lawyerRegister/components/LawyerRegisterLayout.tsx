import { Box, Container, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react"
import { FC } from "react"

export const LawyerRegisterLayout: FC = ({ children }) => {
	return (
		<Box position={"relative"}>
			<Container
				as={SimpleGrid}
				maxW={"6xl"}
				columns={{ base: 1, md: 2 }}
				spacing={{ base: 10, lg: 32 }}
				p={8}
			>
				<Stack>
					<Heading lineHeight={1.1} fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}>
						Lawyer Registration
					</Heading>
					<Text>
						We’re looking for amazing lawyer just like you! Become a part of our
						lawyer community team and increase your profits!
					</Text>
				</Stack>
				<Stack
					bg={"gray.50"}
					rounded={"xl"}
					p={{ base: 4, sm: 6, md: 8 }}
					spacing={{ base: 8 }}
					maxW={{ lg: "lg" }}
				>
					{children}
				</Stack>
			</Container>
		</Box>
	)
}
