import { Box } from "@chakra-ui/react"
import { FC } from "react"
import { SidebarLayout } from "../../../components/sidebar/SidebarLayout"
import { AuthRole } from "../../../utils/enums"
import { useAdminAuth } from "../useAdminAuth"
import { LawyerListView } from "./LawyerListView"

export const AdminLawyer: FC = () => {
	useAdminAuth()
	return (
		<SidebarLayout role={AuthRole.ADMIN} headingText="Lawyers">
			<Box>
				<LawyerListView />
			</Box>
		</SidebarLayout>
	)
}
