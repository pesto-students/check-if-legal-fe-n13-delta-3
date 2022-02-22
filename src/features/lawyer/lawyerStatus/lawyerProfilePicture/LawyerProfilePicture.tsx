import { Avatar, Box, Button, Flex } from "@chakra-ui/react"
import { FC } from "react"
import { API_URL } from "../../../../configs"
import { useLawyerData } from "../../lawyer.query"

export const LawyerProfilePicture: FC = () => {
	const { data: lawyer } = useLawyerData()

	if (!lawyer) return null
	const profileSrc = `${API_URL}/static/lawyerPictures/${lawyer.id}.jpg`

	return (
		<Box>
			<Flex direction={"column"}>
				<Avatar size={"2xl"} src={profileSrc} name={lawyer.name} />
				<Button size={"sm"} mt={2} colorScheme="blackAlpha">
					Update Profile Picture
				</Button>
			</Flex>
		</Box>
	)
}
