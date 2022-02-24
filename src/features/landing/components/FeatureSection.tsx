import { Box, chakra, Container, Flex, Icon, Stack } from "@chakra-ui/react"
import { FC } from "react"

export const FeatureSection: FC = () => {
	const features = [
		{
			title: "Simple and easy to use",
			description:
				"Our system is designed in a way that it give simple and straightforward experience to users. ",
			icon: (
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
				/>
			),
		},
		{
			title: "Fully Transparent",
			description:
				"Each and every process is fully transparent to user and lawyer through the system.",
			icon: (
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
				/>
			),
		},
		{
			title: "Reliable",
			description:
				"Lawyers in our system are verified and monitored carefully for reliability and sustainability.",
			icon: (
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
				/>
			),
		},
		{
			title: "More Control",
			description:
				"Our platform gives user more control over budget and lawyer selection.",
			icon: (
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
				/>
			),
		},
	]

	return (
		<Container
			maxW={"6xl"}
			bg={"white"}
			justifyContent="center"
			alignItems="center"
			id="feature"
		>
			<Box my={12} py={12} bg={"gray.800"} rounded="xl">
				<Box maxW="7xl" mx="auto" px={{ base: 4, lg: 8 }}>
					<Box textAlign={{ lg: "center" }}>
						<chakra.h2
							color={"gray.100"}
							fontWeight="semibold"
							textTransform="uppercase"
							letterSpacing="wide"
						>
							Features
						</chakra.h2>
						<chakra.p
							mt={2}
							fontSize={{ base: "3xl", sm: "4xl" }}
							lineHeight="8"
							fontWeight="extrabold"
							letterSpacing="tight"
							color={"gray.100"}
						>
							A better way to verify legal papers
						</chakra.p>
					</Box>

					<Box mt={10}>
						<Stack
							spacing={{ base: 10, md: 0 }}
							display={{ md: "grid" }}
							gridTemplateColumns={{ md: "repeat(2,1fr)" }}
							gridColumnGap={{ md: 8 }}
							gridRowGap={{ md: 10 }}
						>
							{features.map((feature, i) => (
								<Feature key={i} title={feature.title} icon={feature.icon}>
									{feature.description}
								</Feature>
							))}
						</Stack>
					</Box>
				</Box>
			</Box>
		</Container>
	)
}

const Feature = (props: any) => {
	return (
		<Flex>
			<Flex shrink={0}>
				<Flex
					alignItems="center"
					justifyContent="center"
					h={12}
					w={12}
					rounded="md"
					color="white"
				>
					<Icon
						boxSize={6}
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						{props.icon}
					</Icon>
				</Flex>
			</Flex>
			<Box ml={4}>
				<chakra.dt
					fontSize="lg"
					fontWeight="medium"
					lineHeight="6"
					color={"gray.100"}
				>
					{props.title}
				</chakra.dt>
				<chakra.dd mt={2} color={"gray.400"}>
					{props.children}
				</chakra.dd>
			</Box>
		</Flex>
	)
}
