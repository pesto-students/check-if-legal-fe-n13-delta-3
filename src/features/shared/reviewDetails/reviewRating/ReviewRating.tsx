import { Box, Button, Flex, Heading, Text, useDisclosure } from "@chakra-ui/react"
import { ComponentProps, FC } from "react"
import { AiOutlineStar } from "react-icons/ai"
import { ReviewStatus } from "../../review/IReview"
import { useReviewDetailsData } from "../reviewDetails.query"
import { ReviewRatingDrawer } from "./ReviewRatingDrawer"

interface IProps extends ComponentProps<typeof Box> {
	reviewId: number
	isLawyer: boolean
}

export const ReviewRating: FC<IProps> = ({ reviewId, isLawyer, ...rest }) => {
	const { data } = useReviewDetailsData({ reviewId })
	const ratingDrawer = useDisclosure()

	if (!data?.review) return null
	const isReviewClosed = data?.review.status === ReviewStatus.CLOSED
	if (!isReviewClosed) return null

	const toShowUpdateDrawer = !isLawyer
	const toShowAltText = !data.rating && isLawyer
	const toShowAddReviewButton = !data.rating && !isLawyer
	const toShowUpdateButton = data.rating && !isLawyer

	return (
		<Box {...rest}>
			<Heading size={"md"}>Rating</Heading>

			{toShowUpdateDrawer && (
				<ReviewRatingDrawer
					isLawyer={isLawyer}
					reviewId={reviewId}
					{...ratingDrawer}
				/>
			)}

			{data.rating && (
				<Box>
					<Flex alignItems={"center"} gap={1}>
						<AiOutlineStar />
						<Text maxW={"xl"}>
							<b>{data.rating.rating}</b>/5
						</Text>
					</Flex>
					<Text maxW={"xl"}>{data.rating.comment}</Text>
				</Box>
			)}

			{toShowAltText && (
				<Box>
					<Text maxW={"sm"}>Review is not rated by user yet.</Text>
				</Box>
			)}

			{toShowAddReviewButton && (
				<Box>
					<Text maxW={"sm"}>Rate the review to express your experience.</Text>
					<Button
						mt={1}
						size="sm"
						colorScheme={"blue"}
						onClick={ratingDrawer.onOpen}
					>
						Add Rating
					</Button>
				</Box>
			)}

			{toShowUpdateButton && (
				<Button mt={1} size="sm" onClick={ratingDrawer.onOpen}>
					Update Rating
				</Button>
			)}
		</Box>
	)
}
