import { FC } from "react"
import { SidebarLayout } from "../../shared/components/sidebar/SidebarLayout"
import { AuthRole } from "../../../utils/enums"
import { useVerifiedLawyerAuth } from "../useVerifiedLawyerAuth"

export const LawyerDashboard: FC = () => {
	useVerifiedLawyerAuth()

	return (
		<SidebarLayout role={AuthRole.LAWYER} headingText="Dashboard">
			<h1>Dashboard</h1>
		</SidebarLayout>
	)
}
