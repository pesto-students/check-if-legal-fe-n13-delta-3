import { FC } from "react"
import { AuthRole } from "../../../utils/enums"
import { SidebarLayout } from "../../shared/components/sidebarLayout/SidebarLayout"
import { ReviewListView } from "../../shared/review/ReviewListView"
import { useVerifiedLawyerAuth } from "../useVerifiedLawyerAuth"

export const LawyerReview: FC = () => {
	const { token } = useVerifiedLawyerAuth()

	return (
		<SidebarLayout role={AuthRole.LAWYER} headingText="Reviews">
			<ReviewListView token={token} isLawyer />
		</SidebarLayout>
	)
}
