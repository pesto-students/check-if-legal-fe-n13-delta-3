import { FC } from "react"
import { SidebarLayout } from "../../../components/sidebar/SidebarLayout"
import { AuthRole } from "../../../utils/enums"

export const AdminDashboard: FC = () => {
	return (
		<SidebarLayout role={AuthRole.ADMIN} headingText="Dashboard">
			<h1>Dashboard</h1>
		</SidebarLayout>
	)
}
