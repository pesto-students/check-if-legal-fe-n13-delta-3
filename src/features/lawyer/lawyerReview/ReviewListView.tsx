import { Flex, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"
import { FC, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { formatInr, normalizeDateTime } from "../../../utils/helpers"
import { CenteredSpinner } from "../../shared/components/ui/CenterSpinner"
import { useVerifiedLawyerAuth } from "../useVerifiedLawyerAuth"
import { useLawyerReviewStore } from "./useLawyerReviewStore"

export const ReviewListView: FC = () => {
	const { token } = useVerifiedLawyerAuth()
	const navigate = useNavigate()
	const { reviews, isReviewsLoading, fetchReviews } = useLawyerReviewStore()

	useEffect(() => {
		fetchReviews({ token })
	}, [fetchReviews, token])

	if (isReviewsLoading || !reviews) return <CenteredSpinner />

	return (
		<Table size="sm" fontSize={"lg"} mt={4}>
			<Thead>
				<Tr>
					<Th>Paper Type</Th>
					<Th>User</Th>
					<Th>Status</Th>
					<Th isNumeric>Price (INR)</Th>
					<Th isNumeric>Last Modified</Th>
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
						onClick={() => navigate(`/lawyer/review/${review.id}/details`)}
					>
						<Td fontWeight={"semibold"}>{review.paperType.name}</Td>
						<Td>
							<Flex alignItems={"center"} gap="2">
								<Text>{review.user?.name || "Unknown User"}</Text>
							</Flex>
						</Td>
						<Td>{review.status.toUpperCase()}</Td>
						<Td isNumeric>{formatInr(review.price)}</Td>
						<Td isNumeric>{normalizeDateTime(review.updatedAt)}</Td>
					</Tr>
				))}
			</Tbody>
		</Table>
	)
}
