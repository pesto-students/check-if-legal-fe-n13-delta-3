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
import _ from "lodash"
import { FC, useEffect } from "react"
import { AiOutlineStar } from "react-icons/ai"
import { useNavigate } from "react-router-dom"
import { getLawyerProfileUrl, normalizeDate } from "../../../utils/helpers"
import { CenteredSpinner } from "../components/ui/CenterSpinner"
import { EmptyState } from "../components/ui/EmptyState"
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

	if (_.isEmpty(ratings)) {
		return <EmptyState headingText="No Ratings" />
	}

	return (
		<Box>
			{/** For Mobile */}
			<Box display={{ sm: "none" }}>
				{ratings?.map((el) => {
					const name = isLawyer ? el.review.user?.name : el.review.lawyer?.name
					const profileUrl =
						(!isLawyer && getLawyerProfileUrl(el.review.lawyerId)) || undefined
					return (
						<Box
							key={el.id}
							m={4}
							p={4}
							border="1px"
							borderColor={"gray.300"}
							borderRadius={"lg"}
							onClick={() => {
								const role = isLawyer ? "lawyer" : "user"
								navigate(`/${role}/review/${el.reviewId}/details`)
							}}
						>
							<Flex direction={"column"} gridGap="3">
								<Flex gap={4} alignItems="center">
									<Avatar size={"lg"} name={name} src={profileUrl} />
									<Box>
										<Heading size={"md"}>{name}</Heading>
										<Flex alignItems={"center"} gap={1}>
											<AiOutlineStar />
											<Text fontSize={"lg"}>
												<b>{el.rating}</b>/5
											</Text>
										</Flex>
									</Box>
								</Flex>
								<Box flexGrow={"1"}>
									<Text>{el.comment}</Text>
									<Text>
										For Review of <b>{el.review.paperType.name}</b>
									</Text>

									<Text>Date: {normalizeDate(el.createdAt)}</Text>
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
									<Flex>
										<AiOutlineStar />
										&nbsp;<b>{el.rating}</b>&nbsp;/ 5
									</Flex>
								</Td>
								<Td>{el.comment}</Td>
								<Td>{normalizeDate(el.createdAt)}</Td>
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
