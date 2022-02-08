import { Box } from "@chakra-ui/react"
import { ComponentProps, FC } from "react"

interface Props extends Omit<ComponentProps<typeof Box>, "children"> {
	label: string
	suffixLabel?: string
}

export const InputLabel: FC<Props> = ({ children, label, suffixLabel, ...rest }) => (
	<Box as="label" fontWeight={"semibold"} {...rest}>
		{label}
		{suffixLabel && (
			<Box as="span" color={"gray.500"} fontSize={"sm"} fontWeight={"normal"}>
				{" "}
				{suffixLabel}
			</Box>
		)}
	</Box>
)
