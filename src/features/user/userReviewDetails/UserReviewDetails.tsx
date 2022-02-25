import { Box } from "@chakra-ui/react"
import { FC } from "react"
import { useParams } from "react-router-dom"
import { AuthRole } from "../../../utils/enums"
import { SidebarLayout } from "../../shared/components/sidebarLayout/SidebarLayout"
import { ReviewDetails } from "../../shared/reviewDetails/ReviewDetails"
import { useUserAuth } from "../useUserAuth"

export const UserReviewDetails: FC = () => {
	const { role, token } = useUserAuth()
	const params = useParams<{ id: string }>()

	if (!params.id) return <Box>Invalid Review</Box>

	return (
		<SidebarLayout role={AuthRole.USER} headingText="Review Details" p={4}>
			<ReviewDetails
				isLawyer={role === AuthRole.LAWYER}
				token={token}
				reviewId={+params.id}
			/>
		</SidebarLayout>
	)
}
