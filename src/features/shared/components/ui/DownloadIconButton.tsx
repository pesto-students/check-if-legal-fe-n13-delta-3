import { IconButton } from "@chakra-ui/react"
import React from "react"
import { AiOutlineCloudDownload } from "react-icons/ai"

export const DownloadIconButton: React.FC<{ onClick?: Function; size?: string }> = ({
	onClick,
	size,
	...rest
}) => (
	<IconButton
		aria-label="delete"
		variant="ghost"
		icon={<AiOutlineCloudDownload />}
		size={size ?? "sm"}
		mx="1"
		colorScheme={"blue"}
		onClick={() => onClick && onClick()}
		{...rest}
	/>
)
