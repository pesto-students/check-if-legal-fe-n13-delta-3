import { IconButton } from "@chakra-ui/react"
import React from "react"
import { BsTrash2Fill } from "react-icons/bs"

export const DeleteIconButton: React.FC<{ onClick?: Function; size?: string }> = ({
	onClick,
	size,
	...rest
}) => (
	<IconButton
		aria-label="delete"
		variant="ghost"
		icon={<BsTrash2Fill />}
		size={size ?? "sm"}
		mx="1"
		colorScheme={"red"}
		onClick={() => onClick && onClick()}
		{...rest}
	/>
)
