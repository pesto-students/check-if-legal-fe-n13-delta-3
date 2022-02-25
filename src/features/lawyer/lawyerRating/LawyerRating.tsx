import { FC } from "react"
import { AuthRole } from "../../../utils/enums"
import { SidebarLayout } from "../../shared/components/sidebarLayout/SidebarLayout"
import { RatingListView } from "../../shared/rating/RatingListView"
import { useVerifiedLawyerAuth } from "../useVerifiedLawyerAuth"

export const LawyerRating: FC = () => {
	const { token } = useVerifiedLawyerAuth()

	return (
		<SidebarLayout role={AuthRole.LAWYER} headingText="Ratings">
			<RatingListView token={token} isLawyer />
		</SidebarLayout>
	)
}
