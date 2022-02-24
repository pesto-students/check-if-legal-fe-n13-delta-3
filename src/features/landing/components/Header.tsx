import {
	Box,
	Button,
	chakra,
	CloseButton,
	Container,
	Flex,
	HStack,
	IconButton,
	Img,
	useDisclosure,
	VStack,
} from "@chakra-ui/react"
import { NavHashLink } from "@xzar90/react-router-hash-link"
import { FC, Fragment } from "react"
import { AiOutlineMenu } from "react-icons/ai"
import { NavLink } from "react-router-dom"

interface IProps {
	onOpen: () => void
}

export const Header: FC<IProps> = ({ onOpen }) => {
	const bg = "white"
	const mobileNav = useDisclosure()

	const navItems = [
		{ href: "offering", name: "Verify Papers", onClick: onOpen },
		{ href: "#feature", name: "Features", samePage: true },
		{ href: "for-lawyer", name: "For Lawyers", samePage: true },
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
			bgColor={"rgba(255, 255, 255, .8)"}
			backdropFilter={"blur(20px)"}
		>
			<Container maxW={"6xl"}>
				<Flex alignItems="center" justifyContent="space-between" mx="auto">
					<Flex>
						<chakra.h1 fontSize="xl" fontWeight="semibold" ml="2">
							<Img src="assets/logo-dark.png" height={"25px"} />
						</chakra.h1>
					</Flex>
					<HStack display="flex" alignItems="center" spacing={1}>
						<HStack
							spacing={1}
							mr={1}
							display={{ base: "none", md: "inline-flex" }}
						>
							{navItems.map((item, i) => {
								if (item.onClick) {
									return (
										<Button key={i} variant="ghost" onClick={item.onClick}>
											{item.name}
										</Button>
									)
								}

								const Link = item.samePage ? NavHashLink : NavLink
								return (
									<Link to={item.href} key={i}>
										<Button variant="ghost">{item.name}</Button>
									</Link>
								)
							})}
						</HStack>
						<NavLink to={"login"}>
							<Button colorScheme="blue" size="md" mx={{ base: 1, sm: 4 }}>
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

								{navItems.map((item, i) => {
									if (item.onClick) {
										return (
											<Button
												key={i}
												w="full"
												variant="ghost"
												onClick={item.onClick}
											>
												{item.name}
											</Button>
										)
									}

									const Link = item.samePage ? NavHashLink : NavLink
									return (
										<Fragment key={i}>
											<Link to={item.href} smooth onClick={mobileNav.onClose}>
												<Button w="full" variant="ghost">
													{item.name}
												</Button>
											</Link>
										</Fragment>
									)
								})}
							</VStack>
						</Box>
					</HStack>
				</Flex>
			</Container>
		</chakra.header>
	)
}
