import { Box, Button, Heading, Text } from "@chakra-ui/react"
import { ComponentProps, FC } from "react"
import { useReviewDetailsStore } from "../useReviewDetailsStore"
import { ReviewNoteUpdateDrawer } from "./updateReviewNote/ReviewNoteUpdateDrawer"
import { useReviewNoteUpdateStore } from "./updateReviewNote/useReviewNoteUpdateStore"

interface IProps extends ComponentProps<typeof Box> {}

export const ReviewNote: FC<IProps> = (props) => {
	const { setIsDrawerOpen } = useReviewNoteUpdateStore()
	const { isLawyer, review } = useReviewDetailsStore()
	if (!review) return null

	const toShowUpdateDrawer = !isLawyer
	const toShowAltText = !review.userNote && isLawyer
	const toShowAddReviewButton = !review.userNote && !isLawyer
	const toShowUpdateButton = review.userNote && !isLawyer

	return (
		<Box {...props}>
			<Heading size={"md"}>Review Note</Heading>

			{toShowUpdateDrawer && <ReviewNoteUpdateDrawer />}

			{review.userNote && <Text maxW={"xl"}>{review.userNote}</Text>}

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
					<Button mt={2} size="sm" onClick={() => setIsDrawerOpen(true)}>
						Add Review Note
					</Button>
				</Box>
			)}

			{toShowUpdateButton && (
				<Button mt={2} size="sm" onClick={() => setIsDrawerOpen(true)}>
					Update Note
				</Button>
			)}
		</Box>
	)
}
