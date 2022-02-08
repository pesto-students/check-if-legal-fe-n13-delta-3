import { FC } from "react"
import { SidebarLayout } from "../../../components/sidebar/SidebarLayout"
import { AuthRole } from "../../../utils/enums"

export const UserDashboard: FC = () => {
	return (
		<SidebarLayout role={AuthRole.USER} headingText="Dashboard">
			<h1>Dashboard</h1>
		</SidebarLayout>
	)
}
