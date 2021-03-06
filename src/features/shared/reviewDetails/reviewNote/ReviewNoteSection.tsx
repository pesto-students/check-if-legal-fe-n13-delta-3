import { Box, Button, Heading, Text, useDisclosure } from "@chakra-ui/react"
import { ComponentProps, FC } from "react"
import { ReviewStatus } from "../../review/IReview"
import { useReviewDetailsData } from "../reviewDetails.query"
import { ReviewNoteUpdateDrawer } from "./ReviewNoteUpdateDrawer"

interface IProps extends ComponentProps<typeof Box> {
	reviewId: number
	isLawyer: boolean
}

export const ReviewNoteSection: FC<IProps> = ({ reviewId, isLawyer, ...rest }) => {
	const { data } = useReviewDetailsData({ reviewId })
	const updateDrawer = useDisclosure()

	if (!data?.review) return null
	const review = data.review
	const isReviewOpen = review.status !== ReviewStatus.CLOSED

	const toShowUpdateDrawer = !isLawyer
	const toShowAltText = !review.userNote && (!isReviewOpen || isLawyer)
	const toShowAddReviewButton = !review.userNote && !isLawyer && isReviewOpen
	const toShowUpdateButton = review.userNote && !isLawyer && isReviewOpen

	return (
		<Box {...rest}>
			<Heading size={"md"}>Review Note</Heading>

			{toShowUpdateDrawer && (
				<ReviewNoteUpdateDrawer reviewId={reviewId} {...updateDrawer} />
			)}

			{review.userNote && (
				<Box>
					<Text maxW={"xl"}>{review.userNote}</Text>
				</Box>
			)}

			{toShowAltText && (
				<Box>
					<Text maxW={"sm"}>No note proved for review.</Text>
				</Box>
			)}

			{toShowAddReviewButton && (
				<Box>
					<Text maxW={"sm"}>
						Add more info in words regarding papers review, it will help lawyer to
						understand better.
					</Text>
					<Button mt={2} size="sm" onClick={updateDrawer.onOpen}>
						Add Review Note
					</Button>
				</Box>
			)}

			{toShowUpdateButton && (
				<Button mt={2} size="sm" onClick={updateDrawer.onOpen}>
					Update Note
				</Button>
			)}
		</Box>
	)
}
