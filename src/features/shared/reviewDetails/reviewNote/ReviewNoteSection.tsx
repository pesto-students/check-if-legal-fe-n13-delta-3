import { Box, Button, Heading, Text, useDisclosure } from "@chakra-ui/react"
import { ComponentProps, FC } from "react"
import { useReviewDetailsData } from "../reviewDetails.query"
import { ReviewNoteUpdateDrawer } from "./ReviewNoteUpdateDrawer"

interface IProps extends ComponentProps<typeof Box> {
	reviewId: number
	isLawyer: boolean
}

export const ReviewNoteSection: FC<IProps> = ({ reviewId, isLawyer, ...rest }) => {
	const { data } = useReviewDetailsData({ reviewId })
	const updateDrawer = useDisclosure()

	if (!data) return null
	const review = data.review

	const toShowUpdateDrawer = !isLawyer
	const toShowAltText = !review.userNote && isLawyer
	const toShowAddReviewButton = !review.userNote && !isLawyer
	const toShowUpdateButton = review.userNote && !isLawyer

	return (
		<Box {...rest}>
			<Heading size={"md"}>Review Note</Heading>

			{toShowUpdateDrawer && (
				<ReviewNoteUpdateDrawer
					isLawyer={isLawyer}
					reviewId={reviewId}
					{...updateDrawer}
				/>
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
