import { IconButton } from "@chakra-ui/react"
import { ComponentProps, FC } from "react"
import { AiOutlineCloudDownload } from "react-icons/ai"

type IProps = Omit<ComponentProps<typeof IconButton>, "aria-label" | "icon">

export const DownloadIconButton: FC<IProps> = ({ ...rest }) => (
	<IconButton
		aria-label="download"
		variant="ghost"
		icon={<AiOutlineCloudDownload />}
		mx="1"
		colorScheme={"blue"}
		{...rest}
	/>
)
