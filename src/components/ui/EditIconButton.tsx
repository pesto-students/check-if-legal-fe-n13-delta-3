import { IconButton } from "@chakra-ui/react"
import React from "react"
import { BsPencilFill } from "react-icons/bs"

export const EditIconButton: React.FC<{
	onClick?: Function | (() => void)
	size?: string
}> = ({ onClick, size, ...rest }) => (
	<IconButton
		aria-label="edit"
		variant="ghost"
		icon={<BsPencilFill />}
		size={size ?? "sm"}
		mx="1"
		colorScheme={"yellow"}
		onClick={() => onClick && onClick()}
		{...rest}
	/>
)
