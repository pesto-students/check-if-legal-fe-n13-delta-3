import { Flex, Icon } from "@chakra-ui/react"
import { ComponentProps, FC } from "react"

type IProps = ComponentProps<typeof Flex> & { icon?: any }

export const NavItem: FC<IProps> = ({ icon, children, ...rest }: IProps) => (
	<Flex
		align="center"
		px="4"
		mx="2"
		rounded="md"
		py="2"
		cursor="pointer"
		color="whiteAlpha.700"
		_hover={{ bg: "whiteAlpha.100", color: "whiteAlpha.900" }}
		role="group"
		fontWeight="semibold"
		transition=".15s ease"
		{...rest}
	>
		{icon && <Icon mr="2" boxSize="4" _groupHover={{ color: "gray.300" }} as={icon} />}
		{children}
	</Flex>
)
