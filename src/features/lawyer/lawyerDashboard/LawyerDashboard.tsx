import { FC } from "react"
import { SidebarLayout } from "../../shared/components/sidebar/SidebarLayout"
import { AuthRole } from "../../../utils/enums"

export const LawyerDashboard: FC = () => {
	return (
		<SidebarLayout role={AuthRole.LAWYER} headingText="Dashboard">
			<h1>Dashboard</h1>
		</SidebarLayout>
	)
}
