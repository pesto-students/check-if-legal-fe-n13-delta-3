import { Avatar, Flex, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"
import { FC, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { normalizeDateTime } from "../../../utils/helpers"
import { CenteredSpinner } from "../../shared/components/ui/CenterSpinner"
import { useUserAuth } from "../useUserAuth"
import { useReviewStore } from "./useReviewStore"

export const ReviewListView: FC = () => {
	const { token } = useUserAuth()
	const navigate = useNavigate()
	const { reviews, isReviewsLoading, fetchReviews } = useReviewStore()

	useEffect(() => {
		fetchReviews({ token })
	}, [fetchReviews, token])

	if (isReviewsLoading || !reviews) return <CenteredSpinner />

	return (
		<Table size="sm" fontSize={"lg"} mt={4}>
			<Thead>
				<Tr>
					<Th>Paper Type</Th>
					<Th>Lawyer</Th>
					<Th>Status</Th>
					<Th>Last Modified</Th>
				</Tr>
			</Thead>
			<Tbody>
				{reviews.map((review) => (
					<Tr
						as={Tr}
						href={`/review/${review.id}`}
						key={review.id}
						cursor="pointer"
						_hover={{ backgroundColor: "gray.100" }}
						onClick={() => navigate(`/user/review/${review.id}/details`)}
					>
						<Td fontWeight={"semibold"}>{review.paperType.name}</Td>
						<Td>
							<Flex alignItems={"center"} gap="2">
								<Avatar size={"sm"} name={review.lawyer?.name} />
								<Text>{review.lawyer?.name || "Unknown Lawyer"}</Text>
							</Flex>
						</Td>
						<Td>{review.status.toUpperCase()}</Td>
						<Td>{normalizeDateTime(review.updatedAt)}</Td>
					</Tr>
				))}
			</Tbody>
		</Table>
	)
}
