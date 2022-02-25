import { FC } from "react"
import { AuthRole } from "../../../utils/enums"
import { SidebarLayout } from "../../shared/components/sidebarLayout/SidebarLayout"
import { RatingListView } from "../../shared/rating/RatingListView"
import { useUserAuth } from "../useUserAuth"

export const UserRating: FC = () => {
	const { token } = useUserAuth()

	return (
		<SidebarLayout role={AuthRole.USER} headingText="Ratings">
			<RatingListView token={token} isLawyer={false} />
		</SidebarLayout>
	)
}
