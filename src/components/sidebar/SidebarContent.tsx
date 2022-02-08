import { Box, Flex, Text } from "@chakra-ui/react"
import _ from "lodash"
import { ComponentProps, FC } from "react"
import { AiFillHome, AiFillBank } from "react-icons/ai"
import {
	MdDocumentScanner,
	MdCategory,
	MdLocationCity,
	MdReviews,
	MdLocalOffer,
} from "react-icons/md"
import { GoSignOut } from "react-icons/go"
import { IoLanguage, IoSettingsSharp } from "react-icons/io5"
import { RiSecurePaymentFill } from "react-icons/ri"
import { ImUserTie } from "react-icons/im"
import { IconType } from "react-icons/lib"
import { NavLink } from "react-router-dom"
import { AuthRole } from "../../utils/enums"
import { NavItem } from "./NavItem"
import { SelectedNavItem } from "./SelectedNavItem"

type IProps = ComponentProps<typeof Box> & { role: AuthRole }

export const SidebarContent: FC<IProps> = ({ role, ...rest }) => {
	const navItems = getNavItems(role)

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
			{...rest}
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
				gap={1}
			>
				{navItems.map(({ name, icon, link }, i) => {
					const isSelected = link === window.location.pathname
					return (
						<NavLink to={link} key={i}>
							{isSelected && <SelectedNavItem icon={icon}>{name}</SelectedNavItem>}
							{!isSelected && <NavItem icon={icon}>{name}</NavItem>}
						</NavLink>
					)
				})}
			</Flex>
		</Box>
	)
}

function getNavItems(role: AuthRole) {
	let items: { name: string; icon: IconType; link: string }[] = []

	if (role === AuthRole.ADMIN) {
		items.push(
			{ name: "Home", icon: AiFillHome, link: "/admin" },
			{ name: "Languages", icon: IoLanguage, link: "/admin/language" },
			{ name: "Paper Types", icon: MdCategory, link: "/admin/paperType" },
			{ name: "Locations", icon: MdLocationCity, link: "/admin/location" },
			{ name: "Lawyers", icon: ImUserTie, link: "/admin/lawyer" },
		)
	} else if (role === AuthRole.USER) {
		items.push(
			{ name: "Home", icon: AiFillHome, link: "/user" },
			{ name: "Reviews", icon: MdDocumentScanner, link: "/user/review" },
			{ name: "Payments", icon: RiSecurePaymentFill, link: "/user/payment" },
			{ name: "Rating", icon: MdReviews, link: "/user/rating" },
			{ name: "Settings", icon: IoSettingsSharp, link: "/user/setting" },
		)
	} else if (role === AuthRole.LAWYER) {
		items.push(
			{ name: "Home", icon: AiFillHome, link: "/lawyer" },
			{ name: "Reviews", icon: MdDocumentScanner, link: "/lawyer/review" },
			{ name: "Payments", icon: RiSecurePaymentFill, link: "/lawyer/payment" },
			{ name: "Banks", icon: AiFillBank, link: "/lawyer/bank" },
			{ name: "Offerings", icon: MdLocalOffer, link: "/lawyer/offering" },
			{ name: "Settings", icon: IoSettingsSharp, link: "/lawyer/setting" },
		)
	}

	items.push({ name: "Logout", icon: GoSignOut, link: "/logout" })
	return items
}
