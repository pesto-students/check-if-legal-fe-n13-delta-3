import { Box, Button, Text } from "@chakra-ui/react"
import { FC } from "react"
import { useReviewNoteUpdateStore } from "./updateReviewNote/useReviewNoteUpdateStore"

export const AddReviewNoteBox: FC = () => {
	const { setIsDrawerOpen } = useReviewNoteUpdateStore()

	return (
		<Box>
			<Text maxW={"sm"}>
				Add more info in words regarding papers review, it will help lawyer to
				understand better.
			</Text>
			<Button mt={2} size="sm" onClick={() => setIsDrawerOpen(true)}>
				Add Review Note
			</Button>
		</Box>
	)
}
