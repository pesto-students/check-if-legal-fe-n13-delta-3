import { FC } from "react"
import { SidebarLayout } from "../../../components/sidebar/SidebarLayout"
import { AuthRole } from "../../../utils/enums"
import { useAdminAuth } from "../useAdminAuth"

export const AdminDashboard: FC = () => {
	useAdminAuth()
	return (
		<SidebarLayout role={AuthRole.ADMIN} headingText="Dashboard">
			<h1>Dashboard</h1>
		</SidebarLayout>
	)
}
