import {
	Avatar,
	Box,
	Center,
	Flex,
	Heading,
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
	const limit = 10
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
			{/** For Mobile */}
			<Box display={{ sm: "none" }}>
				{reviews?.map((review) => {
					const name = isLawyer ? review.user?.name : review.lawyer?.name
					const profileUrl =
						(!isLawyer && getLawyerProfileUrl(review.lawyerId)) || undefined

					return (
						<Box
							key={review.id}
							m={4}
							p={4}
							border="1px"
							borderColor={"gray.300"}
							borderRadius={"lg"}
							onClick={() => {
								navigate(`/user/review/${review.id}/details`)
							}}
						>
							<Flex direction={"column"} gridGap="3">
								<Box>
									<Avatar size={"lg"} name={name} src={profileUrl} />
								</Box>
								<Box flexGrow={"1"}>
									<Heading size={"md"}>{name}</Heading>
									<Text>Paper Type: {review.paperType.name}</Text>
									<Text>
										Review Status: {getReviewStatusText(review.status)}
									</Text>
									<Text>Price: {formatInr(review.price)} INR</Text>
									<Text>
										Last Modified: {normalizeDateTime(review.updatedAt)}
									</Text>
								</Box>
							</Flex>
						</Box>
					)
				})}
			</Box>

			{/** For Desktop */}
			<Table display={{ base: "none", sm: "table" }} size="sm" fontSize={"lg"} mt={4}>
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
								<Td fontWeight={"semibold"}>
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