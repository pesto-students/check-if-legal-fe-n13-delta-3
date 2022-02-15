import { Box, Button, Text } from "@chakra-ui/react"
import { FC } from "react"

export const UploadDocuments: FC = () => (
	<Box>
		<Text maxW={"sm"}>
			Upload all the necessary documents required for the review process in image or
			PDF format
		</Text>
		<Button mt={2} size="sm" colorScheme={"blue"}>
			Upload Documents
		</Button>
	</Box>
)
