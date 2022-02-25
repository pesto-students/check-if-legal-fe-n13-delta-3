import { Box, Heading, Text } from "@chakra-ui/react"
import { InfoIcon } from "@chakra-ui/icons"
import { FC } from "react"

interface IProps {
	headingText: string
	subHeadingText?: string
}

export const EmptyState: FC<IProps> = ({ headingText, subHeadingText }) => {
	return (
		<Box textAlign="center" py={10} px={6}>
			<InfoIcon boxSize={"50px"} color={"blue.500"} />
			<Heading size="md" mt={6} mb={2}>
				{headingText}
			</Heading>
			{subHeadingText && <Text color={"gray.500"}>{subHeadingText}</Text>}
		</Box>
	)
}
