import { Flex } from "@chakra-ui/react"
import { ComponentProps, FC } from "react"
import { NavItem } from "./NavItem"

type IProps = ComponentProps<typeof Flex> & { icon?: any }

export const SelectedNavItem: FC<IProps> = (props: IProps) => (
	<NavItem
		{...props}
		bg="whiteAlpha.100"
		color="whiteAlpha.900"
		_hover={{ bg: "whiteAlpha.100", color: "whiteAlpha.900" }}
	/>
)
