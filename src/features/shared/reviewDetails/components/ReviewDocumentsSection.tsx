import { Box, Heading } from "@chakra-ui/react"
import { ComponentProps, FC } from "react"
import { ReviewDocumentList } from "./ReviewDocumentList"
import { UploadDocumentsSection } from "./UploadDocumentsSection"

interface IProps extends ComponentProps<typeof Box> {
	reviewId: number
	isLawyer: boolean
}

export const ReviewDocumentsSection: FC<IProps> = ({ reviewId, isLawyer, ...rest }) => (
	<Box {...rest}>
		<Heading size={"md"}>Documents</Heading>
		<ReviewDocumentList reviewId={reviewId} isLawyer={isLawyer} />
		{!isLawyer && <UploadDocumentsSection reviewId={reviewId} />}
	</Box>
)
