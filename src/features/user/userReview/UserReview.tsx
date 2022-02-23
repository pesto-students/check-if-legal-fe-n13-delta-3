import { Box, Button } from "@chakra-ui/react"
import { FC } from "react"
import { NavLink } from "react-router-dom"
import { AuthRole } from "../../../utils/enums"
import { ReviewListView } from "../../shared/review/ReviewListView"
import { SidebarLayout } from "../../shared/components/sidebar/SidebarLayout"
import { useUserAuth } from "../useUserAuth"

export const UserReview: FC = () => {
	const { token } = useUserAuth()

	return (
		<SidebarLayout role={AuthRole.USER} headingText="Reviews">
			<Box m={4}>
				<NavLink to={"/offering"}>
					<Button size={"sm"} colorScheme="blue">
						New Review
					</Button>
				</NavLink>
			</Box>

			<ReviewListView token={token} isLawyer={false} />
		</SidebarLayout>
	)
}
