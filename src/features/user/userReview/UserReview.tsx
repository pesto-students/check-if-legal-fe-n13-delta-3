import { Box, Button } from "@chakra-ui/react"
import { FC } from "react"
import { SidebarLayout } from "../../shared/components/sidebar/SidebarLayout"
import { AuthRole } from "../../../utils/enums"
import { useUserAuth } from "../useUserAuth"
import { ReviewListView } from "./ReviewListView"

export const UserReview: FC = () => {
	useUserAuth()
	return (
		<SidebarLayout role={AuthRole.USER} headingText="Reviews">
			<Box m={4}>
				<Button size={"sm"} colorScheme="blue">
					New Review
				</Button>
			</Box>

			<ReviewListView />
		</SidebarLayout>
	)
}
