import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import { FC } from "react"
import { formatInr, getReviewStatusText, normalizeDate } from "../../../utils/helpers"
import { ILawyer } from "../../lawyer/ILawyer"
import { IUser } from "../../user/IUser"
import { CenteredSpinner } from "../components/ui/CenterSpinner"
import { ReviewStatus } from "../review/IReview"
import { ReviewCancel } from "./reviewCancel/ReviewCancel"
import { ReviewClose } from "./reviewClose/ReviewClose"
import { useReviewDetailsQuery } from "./reviewDetails.query"
import { ReviewDocuments } from "./reviewDocuments/ReviewDocuments"
import { ReviewFeedback } from "./reviewFeedback/ReviewFeedback"
import { ReviewNoteSection } from "./reviewNote/ReviewNoteSection"
import { ReviewPayment } from "./reviewPayment/ReviewPayment"
import { ReviewRating } from "./reviewRating/ReviewRating"

interface IProps {
	token: string
	isLawyer: boolean
	reviewId: number
}

export const ReviewDetails: FC<IProps> = ({ token, reviewId, isLawyer }) => {
	const { data, isLoading } = useReviewDetailsQuery({ token, isLawyer, reviewId })

	if (isLoading) return <CenteredSpinner />
	if (!data) return <Box>Review not found</Box>

	return (
		<Box>
			<Heading size={"lg"}>{data.review.paperType.name}</Heading>

			<Flex mt={8} gap={2} flexWrap={"wrap"}>
				<StatusBox status={data.review.status} />
				{!isLawyer && data.review.lawyer && <LawyerBox lawyer={data.review.lawyer} />}
				{isLawyer && data.review.user && <UserBox user={data.review.user} />}
				<DateBox date={data.review.createdAt} />
				<PriceBox price={data.review.price} />
			</Flex>

			<Flex direction={"column"} gap={6} mt={6}>
				<ReviewNoteSection reviewId={reviewId} isLawyer={isLawyer} />
				<ReviewDocuments reviewId={reviewId} isLawyer={isLawyer} />
				{!isLawyer && <ReviewPayment reviewId={reviewId} />}
				<ReviewFeedback reviewId={reviewId} isLawyer={isLawyer} />
				{!isLawyer && <ReviewCancel reviewId={reviewId} />}
				{isLawyer && <ReviewClose reviewId={reviewId} />}
				<ReviewRating reviewId={reviewId} isLawyer={isLawyer} />
			</Flex>
		</Box>
	)
}

const StatusBox: FC<{ status: ReviewStatus }> = ({ status }) => (
	<Box pr={4}>
		<Text fontWeight={"semibold"}>Status:</Text>
		<Text fontSize="xl">{getReviewStatusText(status)}</Text>
	</Box>
)

const LawyerBox: FC<{ lawyer: ILawyer }> = ({ lawyer }) => (
	<Box pr={4}>
		<Text fontWeight={"semibold"}>Lawyer:</Text>
		<Text fontSize="xl">{lawyer.name}</Text>
	</Box>
)

const UserBox: FC<{ user: IUser }> = ({ user }) => (
	<Box pr={4}>
		<Text fontWeight={"semibold"}>User:</Text>
		<Text fontSize="xl">{user.name}</Text>
	</Box>
)

const DateBox: FC<{ date: string }> = ({ date }) => (
	<Box pr={4}>
		<Text fontWeight={"semibold"}>Issue Date:</Text>
		<Text fontSize="xl">{normalizeDate(date)}</Text>
	</Box>
)

const PriceBox: FC<{ price: number }> = ({ price }) => (
	<Box pr={4}>
		<Text fontWeight={"semibold"}>Price:</Text>
		<Text fontSize="xl">{formatInr(price)} INR</Text>
	</Box>
)
