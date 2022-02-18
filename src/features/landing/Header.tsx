import {
	Box,
	Button,
	chakra,
	CloseButton,
	Container,
	Flex,
	HStack,
	IconButton,
	useDisclosure,
	VStack,
} from "@chakra-ui/react"
import { FC } from "react"
import { AiOutlineMenu } from "react-icons/ai"
import { NavLink } from "react-router-dom"

export const Header: FC = () => {
	const bg = "white"
	const mobileNav = useDisclosure()

	const navItems = [
		{ href: "/offering", name: "Verify Papers" },
		{ href: "#feature", name: "Features" },
		{ href: "#about", name: "About Us" },
		{ href: "#for-lawyer", name: "For Lawyers" },
	]

	return (
		<chakra.header
			bg={bg}
			w="full"
			px={{ base: 2, sm: 4 }}
			py={4}
			shadow="md"
			position={"fixed"}
			zIndex={1}
		>
			<Container maxW={"6xl"}>
				<Flex alignItems="center" justifyContent="space-between" mx="auto">
					<Flex>
						<chakra.h1 fontSize="xl" fontWeight="semibold" ml="2">
							CHECK IF LEGAL
						</chakra.h1>
					</Flex>
					<HStack display="flex" alignItems="center" spacing={1}>
						<HStack
							spacing={1}
							mr={1}
							display={{ base: "none", md: "inline-flex" }}
						>
							{navItems.map((item, i) => (
								<chakra.a href={item.href} key={i}>
									<Button variant="ghost">{item.name}</Button>
								</chakra.a>
							))}
						</HStack>
						<NavLink to={"login"}>
							<Button colorScheme="blue" size="sm">
								Sign In
							</Button>
						</NavLink>
						<Box display={{ base: "inline-flex", md: "none" }}>
							<IconButton
								display={{ base: "flex", md: "none" }}
								aria-label="Open menu"
								fontSize="20px"
								color={"gray.800"}
								variant="ghost"
								icon={<AiOutlineMenu />}
								onClick={mobileNav.onOpen}
							/>

							<VStack
								pos="absolute"
								top={0}
								left={0}
								right={0}
								display={mobileNav.isOpen ? "flex" : "none"}
								flexDirection="column"
								p={2}
								pb={4}
								m={2}
								bg={bg}
								spacing={3}
								rounded="sm"
								shadow="sm"
							>
								<CloseButton
									aria-label="Close menu"
									onClick={mobileNav.onClose}
								/>

								{navItems.map((item, i) => (
									<chakra.a key={i} href={item.href}>
										<Button w="full" variant="ghost">
											{item.name}
										</Button>
									</chakra.a>
								))}
							</VStack>
						</Box>
					</HStack>
				</Flex>
			</Container>
		</chakra.header>
	)
}
