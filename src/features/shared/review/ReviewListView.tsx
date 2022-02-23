import { Avatar, Flex, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"
import { FC, useState } from "react"
import { useNavigate } from "react-router-dom"
import { formatInr, getLawyerProfileUrl, normalizeDateTime } from "../../../utils/helpers"
import { CenteredSpinner } from "../../shared/components/ui/CenterSpinner"
import { useReviewListQuery } from "./reviewList.query"

interface IProps {
	token: string
	isLawyer: boolean
}

export const ReviewListView: FC<IProps> = ({ token, isLawyer }) => {
	const [pageNo] = useState(1)
	const { data, isLoading } = useReviewListQuery({ token, pageNo })
	const navigate = useNavigate()

	if (isLoading) return <CenteredSpinner />
	const reviews = data?.reviews

	return (
		<Table size="sm" fontSize={"lg"} mt={4}>
			<Thead>
				<Tr>
					<Th>Paper Type</Th>
					<Th> {isLawyer ? "User" : "Lawyer"}</Th>
					<Th>Status</Th>
					<Th isNumeric>Price (INR)</Th>
					<Th isNumeric>Last Modified</Th>
				</Tr>
			</Thead>
			<Tbody>
				{reviews?.map((review) => (
					<Tr
						key={review.id}
						as={Tr}
						href={`/review/${review.id}`}
						cursor="pointer"
						_hover={{ backgroundColor: "gray.100" }}
						onClick={() => {
							navigate(`/user/review/${review.id}/details`)
						}}
					>
						<Td fontWeight={"semibold"}>{review.paperType.name}</Td>
						<Td>
							<Flex gap={4} alignItems="center">
								<Avatar
									size={"sm"}
									src={
										(!isLawyer && getLawyerProfileUrl(review.lawyerId)) ||
										undefined
									}
								/>
								<Text>{isLawyer ? review.user?.name : review.lawyer?.name}</Text>
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
