import { FC } from "react"
import { AuthRole } from "../../../utils/enums"
import { SidebarLayout } from "../../shared/components/sidebar/SidebarLayout"
import { useUserAuth } from "../useUserAuth"

export const UserReviewDetails: FC = () => {
	useUserAuth()
	return (
		<SidebarLayout role={AuthRole.USER} headingText="Review Details">
			Review Details
		</SidebarLayout>
	)
}
