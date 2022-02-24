import {
	Avatar,
	Box,
	Center,
	Flex,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react"
import { FC, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
	formatInr,
	getLawyerProfileUrl,
	getReviewStatusText,
	normalizeDateTime,
} from "../../../utils/helpers"
import { CenteredSpinner } from "../../shared/components/ui/CenterSpinner"
import { PaginationBox } from "../components/ui/PaginationBox"
import { usePagination } from "../hooks/usePagination"
import { useReviewListQuery } from "./reviewList.query"

interface IProps {
	token: string
	isLawyer: boolean
}

export const ReviewListView: FC<IProps> = ({ token, isLawyer }) => {
	const navigate = useNavigate()
	const limit = 15
	const pagination = usePagination(limit)

	const { data, isLoading } = useReviewListQuery({
		token,
		pageNo: pagination.currentPage,
		limit,
	})

	useEffect(() => {
		if (data?.countReviews) pagination.setTotalItems(data.countReviews)
	}, [data?.countReviews, pagination])

	if (isLoading) return <CenteredSpinner />
	const reviews = data?.reviews
	const toShowPagination = pagination.totalItems > limit

	return (
		<Box>
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
					{reviews?.map((review) => {
						const name = isLawyer ? review.user?.name : review.lawyer?.name
						const profileUrl =
							(!isLawyer && getLawyerProfileUrl(review.lawyerId)) || undefined

						return (
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
										<Avatar size={"sm"} name={name} src={profileUrl} />
										<Text>{name}</Text>
									</Flex>
								</Td>
								<Td>{getReviewStatusText(review.status)}</Td>
								<Td isNumeric>{formatInr(review.price)}</Td>
								<Td isNumeric>{normalizeDateTime(review.updatedAt)}</Td>
							</Tr>
						)
					})}
				</Tbody>
			</Table>
			{toShowPagination && (
				<Center my={4}>
					<PaginationBox size={"sm"} {...pagination} />
				</Center>
			)}
		</Box>
	)
}
