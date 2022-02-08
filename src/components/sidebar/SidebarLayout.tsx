import {
	Box,
	Drawer,
	DrawerContent,
	DrawerOverlay,
	Flex,
	Heading,
	IconButton,
	useColorModeValue,
	useDisclosure,
} from "@chakra-ui/react"
import { ComponentProps, FC } from "react"
import { FiMenu } from "react-icons/fi"
import { AuthRole } from "../../utils/enums"
import { SidebarContent } from "./SidebarContent"

type IProps = ComponentProps<typeof Box> & { role: AuthRole; headingText?: string }

export const SidebarLayout: FC<IProps> = ({ children, role, headingText, ...rest }) => {
	const sidebar = useDisclosure()

	return (
		<Box as="section" minH="100vh">
			<SidebarContent role={role} display={{ base: "none", md: "unset" }} />
			<Drawer isOpen={sidebar.isOpen} onClose={sidebar.onClose} placement="left">
				<DrawerOverlay />
				<DrawerContent>
					<SidebarContent role={role} w="full" borderRight="none" />
				</DrawerContent>
			</Drawer>
			<Box ml={{ base: 0, md: 60 }} transition=".3s ease">
				<Flex
					as="header"
					align="center"
					justify="space-between"
					w="full"
					px="4"
					bg={useColorModeValue("white", "gray.800")}
					borderBottomWidth="1px"
					borderColor="blackAlpha.300"
					h="14"
				>
					<Heading size={"lg"}>{headingText ?? "Heading"}</Heading>
					<IconButton
						aria-label="Menu"
						display={{ base: "inline-flex", md: "none" }}
						onClick={sidebar.onOpen}
						icon={<FiMenu />}
						size="sm"
					/>
				</Flex>

				<Box as="main" p="4" {...rest}>
					{children}
				</Box>
			</Box>
		</Box>
	)
}
