import { Box, Button, Text } from "@chakra-ui/react"
import { FC } from "react"

export const AddReviewNoteBox: FC = () => (
	<Box>
		<Text maxW={"sm"}>
			Add more info in words regarding papers review, it will help lawyer to understand
			better.
		</Text>
		<Button mt={2} size="sm">
			Add Review Note
		</Button>
	</Box>
)
