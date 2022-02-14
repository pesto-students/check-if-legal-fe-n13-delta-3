import { Text } from "@chakra-ui/react"
import { ComponentProps, FC } from "react"

type IProps = ComponentProps<typeof Text>

export const Title: FC<IProps> = ({ children, ...rest }) => {
	return (
		<Text fontSize={"3xl"} color={"gray.800"} fontWeight={"bold"} {...rest}>
			{children}
		</Text>
	)
}
