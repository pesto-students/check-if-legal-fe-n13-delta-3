import { Box, Button } from "@chakra-ui/react"
import { FC } from "react"
import { NavLink } from "react-router-dom"
import { AuthRole } from "../../../utils/enums"
import { SidebarLayout } from "../../shared/components/sidebar/SidebarLayout"
import { useUserAuth } from "../useUserAuth"
import { ReviewListView } from "./ReviewListView"

export const UserReview: FC = () => {
	useUserAuth()

	return (
		<SidebarLayout role={AuthRole.USER} headingText="Reviews">
			<Box m={4}>
				<NavLink to={"/offering"}>
					<Button size={"sm"} colorScheme="blue">
						New Review
					</Button>
				</NavLink>
			</Box>

			<ReviewListView />
		</SidebarLayout>
	)
}
