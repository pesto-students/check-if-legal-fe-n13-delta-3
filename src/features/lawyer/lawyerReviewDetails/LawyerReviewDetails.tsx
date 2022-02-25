import { Box } from "@chakra-ui/react"
import { FC } from "react"
import { useParams } from "react-router-dom"
import { AuthRole } from "../../../utils/enums"
import { SidebarLayout } from "../../shared/components/sidebarLayout/SidebarLayout"
import { ReviewDetails } from "../../shared/reviewDetails/ReviewDetails"
import { useVerifiedLawyerAuth } from "../useVerifiedLawyerAuth"

export const LawyerReviewDetails: FC = () => {
	const { token } = useVerifiedLawyerAuth()
	const params = useParams<{ id: string }>()

	if (!params.id) return <Box>Invalid Review</Box>

	return (
		<SidebarLayout role={AuthRole.LAWYER} headingText="Review Details" p={4}>
			<ReviewDetails isLawyer={true} token={token} reviewId={+params.id} />
		</SidebarLayout>
	)
}
