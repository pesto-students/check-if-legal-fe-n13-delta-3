import { FC } from "react"
import { AuthRole } from "../../../utils/enums"
import { SidebarLayout } from "../../shared/components/sidebar/SidebarLayout"
import { useVerifiedLawyerAuth } from "../useVerifiedLawyerAuth"
import { ReviewListView } from "./ReviewListView"

export const LawyerReview: FC = () => {
	useVerifiedLawyerAuth()

	return (
		<SidebarLayout role={AuthRole.LAWYER} headingText="Reviews">
			<ReviewListView />
		</SidebarLayout>
	)
}
