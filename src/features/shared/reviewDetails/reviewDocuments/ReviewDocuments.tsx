import { Box, Heading } from "@chakra-ui/react"
import { ComponentProps, FC } from "react"
import { ReviewStatus } from "../../review/IReview"
import { useReviewDetailsData } from "../reviewDetails.query"
import { ReviewDocumentList } from "./ReviewDocumentList"
import { UploadDocumentsSection } from "./UploadDocumentsSection"

interface IProps extends ComponentProps<typeof Box> {
	reviewId: number
	isLawyer: boolean
}

export const ReviewDocuments: FC<IProps> = ({ reviewId, isLawyer, ...rest }) => {
	const { data } = useReviewDetailsData({ reviewId })
	const toShowUploadSection = !isLawyer && data?.review.status !== ReviewStatus.CLOSED

	return (
		<Box {...rest}>
			<Heading size={"md"}>Documents</Heading>
			<ReviewDocumentList reviewId={reviewId} isLawyer={isLawyer} />
			{toShowUploadSection && <UploadDocumentsSection reviewId={reviewId} />}
		</Box>
	)
}
