import { Box, Container, Img, Stack, Text } from "@chakra-ui/react"

export const Footer = () => {
	return (
		<Box bg={"gray.50"} color={"gray.700"}>
			<Container
				as={Stack}
				maxW={"6xl"}
				py={4}
				direction={{ base: "column", md: "row" }}
				spacing={4}
				justify={{ base: "center", md: "space-between" }}
				align={{ base: "center", md: "center" }}
			>
				<Img src="assets/logo-dark.png" height={"20px"} />
				<Text>© 2022 Check If Legal. All rights reserved</Text>
			</Container>
		</Box>
	)
}
