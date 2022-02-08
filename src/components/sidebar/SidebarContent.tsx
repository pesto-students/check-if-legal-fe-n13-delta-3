import { Box, Flex, Text } from "@chakra-ui/react"
import _ from "lodash"
import { ComponentProps, FC } from "react"
import { AiFillGift } from "react-icons/ai"
import { BsGearFill } from "react-icons/bs"
import { FaClipboardCheck, FaRss } from "react-icons/fa"
import { HiCode, HiCollection } from "react-icons/hi"
import { MdHome } from "react-icons/md"
import { AuthRole } from "../../utils/enums"
import { storage } from "../../utils/storage"
import { NavItem } from "./NavItem"

type IProps = ComponentProps<typeof Box>

export const SidebarContent: FC<IProps> = (props) => {
	let role = AuthRole.ADMIN
	const authPayload = storage.getAuth()
	if (authPayload) role = authPayload.role

	return (
		<Box
			as="nav"
			pos="fixed"
			top="0"
			left="0"
			zIndex="sticky"
			h="full"
			pb="10"
			overflowX="hidden"
			overflowY="auto"
			bg="gray.800"
			borderColor="blackAlpha.300"
			borderRightWidth="1px"
			w="60"
			{...props}
		>
			<Box px="4" py="5">
				<Text fontSize="2xl" ml="2" color="white" fontWeight="semibold">
					CHECK IF LEGAL
				</Text>
				<Text ml="2" color="whiteAlpha.700">
					{_.capitalize(role)} Portal
				</Text>
			</Box>
			<Flex
				direction="column"
				as="nav"
				fontSize="sm"
				color="gray.600"
				aria-label="Main Navigation"
			>
				<NavItem icon={MdHome}>Home</NavItem>
				<NavItem icon={FaRss}>Articles</NavItem>
				<NavItem icon={HiCollection}>Collections</NavItem>
				<NavItem icon={FaClipboardCheck}>Checklists</NavItem>
				<NavItem icon={HiCode}>Integrations</NavItem>
				<NavItem icon={AiFillGift}>Changelog</NavItem>
				<NavItem icon={BsGearFill}>Settings</NavItem>
			</Flex>
		</Box>
	)
}
