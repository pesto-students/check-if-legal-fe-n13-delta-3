import { Box } from "@chakra-ui/react"
import { FC } from "react"

export const ErrorText: FC = ({ children }) => {
	return (
		<Box fontSize="sm" color="red">
			{children}
		</Box>
	)
}
