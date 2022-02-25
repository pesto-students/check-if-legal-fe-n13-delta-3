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
import { getLawyerProfileUrl, normalizeDateTime } from "../../../utils/helpers"
import { CenteredSpinner } from "../components/ui/CenterSpinner"
import { PaginationBox } from "../components/ui/PaginationBox"
import { usePagination } from "../hooks/usePagination"
import { useRatingListQuery } from "./ratingList.query"

interface IProps {
	token: string
	isLawyer: boolean
}

export const RatingListView: FC<IProps> = ({ token, isLawyer }) => {
	const limit = 10
	const pagination = usePagination(limit)
	const navigate = useNavigate()

	const { data, isLoading } = useRatingListQuery({
		token,
		pageNo: pagination.currentPage,
		limit,
	})

	useEffect(() => {
		if (data?.countRatings) pagination.setTotalItems(data.countRatings)
	}, [data?.countRatings, pagination])

	if (isLoading) return <CenteredSpinner />
	const ratings = data?.ratings
	const toShowPagination = pagination.totalItems > limit

	return (
		<Box>
			{/** For Mobile */}
			{/* <Box display={{ sm: "none" }}>
				{ratings?.map((review) => {
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
			</Box> */}

			{/** For Desktop */}
			<Table display={{ base: "none", sm: "table" }} size="sm" fontSize={"lg"} mt={4}>
				<Thead>
					<Tr>
						<Th>{isLawyer ? "User" : "Lawyer"}</Th>
						<Th>For Review of</Th>
						<Th>Rating</Th>
						<Th>Comment</Th>
						<Th>Date</Th>
					</Tr>
				</Thead>
				<Tbody>
					{ratings?.map((el) => {
						const name = isLawyer ? el.review.user?.name : el.review.lawyer?.name
						const profileUrl =
							(!isLawyer && getLawyerProfileUrl(el.review.lawyerId)) || undefined

						return (
							<Tr
								key={el.id}
								as={Tr}
								cursor="pointer"
								_hover={{ backgroundColor: "gray.100" }}
								onClick={() => {
									const role = isLawyer ? "lawyer" : "user"
									navigate(`/${role}/review/${el.reviewId}/details`)
								}}
							>
								<Td>
									<Flex gap={4} alignItems="center">
										<Avatar size={"sm"} name={name} src={profileUrl} />
										<Text>{name}</Text>
									</Flex>
								</Td>
								<Td>{el.review.paperType.name}</Td>
								<Td>
									<b>{el.rating}</b>&nbsp;/ 5
								</Td>
								<Td>{el.comment}</Td>
								<Td>{normalizeDateTime(el.createdAt)}</Td>
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
