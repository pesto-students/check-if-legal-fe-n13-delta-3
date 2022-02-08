import { Box } from "@chakra-ui/react"
import { ComponentProps, FC } from "react"

type IProps = ComponentProps<typeof Box> & { text: string }

export const ErrorText: FC<IProps> = ({ text, ...rest }) => {
	return (
		<Box fontSize="sm" color="red" {...rest}>
			{text}
		</Box>
	)
}
