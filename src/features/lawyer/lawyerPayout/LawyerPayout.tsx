import { FC } from "react"
import { AuthRole } from "../../../utils/enums"
import { SidebarLayout } from "../../shared/components/sidebarLayout/SidebarLayout"
import { useVerifiedLawyerAuth } from "../useVerifiedLawyerAuth"
import { Bank } from "./bank/Bank"

export const LawyerPayout: FC = () => {
	useVerifiedLawyerAuth()

	return (
		<SidebarLayout role={AuthRole.LAWYER} headingText="Payouts" p={4}>
			<Bank />
		</SidebarLayout>
	)
}
