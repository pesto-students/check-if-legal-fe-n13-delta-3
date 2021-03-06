import { Box } from "@chakra-ui/react"
import { FC } from "react"
import { SidebarLayout } from "../../shared/components/sidebarLayout/SidebarLayout"
import { AuthRole } from "../../../utils/enums"
import { useAdminAuth } from "../useAdminAuth"
import { LawyerListView } from "./lawyerList/LawyerListView"

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
