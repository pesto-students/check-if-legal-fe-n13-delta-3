import {
	Box,
	Drawer,
	DrawerContent,
	DrawerOverlay,
	useDisclosure,
} from "@chakra-ui/react"
import { ComponentProps, FC } from "react"
import { SidebarContent } from "./SidebarContent"

type IProps = ComponentProps<typeof Box>

export const SidebarLayout: FC<IProps> = ({ children, ...rest }) => {
	const sidebar = useDisclosure()

	return (
		<Box as="section" minH="100vh">
			<SidebarContent display={{ base: "none", md: "unset" }} />
			<Drawer isOpen={sidebar.isOpen} onClose={sidebar.onClose} placement="left">
				<DrawerOverlay />
				<DrawerContent>
					<SidebarContent w="full" borderRight="none" />
				</DrawerContent>
			</Drawer>
			<Box ml={{ base: 0, md: 60 }} transition=".3s ease">
				<Box as="main" p="4" {...rest}>
					{children}
				</Box>
			</Box>
		</Box>
	)
}
