import { Box, Button, useDisclosure } from "@chakra-ui/react"
import { FC } from "react"
import { AuthRole } from "../../../utils/enums"
import { SidebarLayout } from "../../shared/components/sidebarLayout/SidebarLayout"
import { OfferingSearchDrawer } from "../../shared/offering/OfferingSearchDrawer"
import { ReviewListView } from "../../shared/review/ReviewListView"
import { useUserAuth } from "../useUserAuth"

export const UserReview: FC = () => {
	const { token } = useUserAuth()
	const offeringSearchDrawer = useDisclosure()

	return (
		<SidebarLayout role={AuthRole.USER} headingText="Reviews">
			<Box m={4}>
				<Button size={"sm"} colorScheme="blue" onClick={offeringSearchDrawer.onOpen}>
					Create New Review
				</Button>
			</Box>

			<ReviewListView token={token} isLawyer={false} />
			<OfferingSearchDrawer {...offeringSearchDrawer} />
		</SidebarLayout>
	)
}
