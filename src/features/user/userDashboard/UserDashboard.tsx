import { FC } from "react"
import { SidebarLayout } from "../../shared/components/sidebar/SidebarLayout"
import { AuthRole } from "../../../utils/enums"
import { useUserAuth } from "../useUserAuth"

export const UserDashboard: FC = () => {
	useUserAuth()

	return (
		<SidebarLayout role={AuthRole.USER} headingText="Dashboard">
			<h1>Dashboard</h1>
		</SidebarLayout>
	)
}
