import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import { FC } from "react"
import { formatInr, normalizeDate } from "../../../utils/helpers"
import { ILawyer } from "../../lawyer/ILawyer"
import { IUser } from "../../user/IUser"
import { CenteredSpinner } from "../components/ui/CenterSpinner"
import { ReviewStatus } from "../review/IReview"
import { ReviewCancel } from "./components/ReviewCancel"
import { ReviewClose } from "./components/ReviewClose"
import { ReviewDocumentsSection } from "./components/ReviewDocumentsSection"
import { ReviewNoteSection } from "./components/ReviewNoteSection"
import { ReviewPaymentSection } from "./components/ReviewPaymentSection"
import { useReviewDetailsQuery } from "./queries/reviewDetails.query"

interface IProps {
	token: string
	isLawyer: boolean
	reviewId: number
}

export const ReviewDetails: FC<IProps> = ({ token, reviewId, isLawyer }) => {
	const { data, isLoading } = useReviewDetailsQuery({ token, reviewId })

	if (isLoading) return <CenteredSpinner />
	if (!data) return <Box>Review not found</Box>

	return (
		<Box>
			<Heading size={"lg"}>{data.review.paperType.name}</Heading>

			<Flex gap={"16"} mt={4}>
				<StatusBox status={data.review.status} />
				{!isLawyer && data.review.lawyer && <LawyerBox lawyer={data.review.lawyer} />}
				{isLawyer && data.review.user && <UserBox user={data.review.user} />}
				<DateBox date={data.review.createdAt} />
				<PriceBox price={data.review.price} />
			</Flex>

			<Flex direction={"column"} gap={6} mt={6}>
				<ReviewNoteSection reviewId={reviewId} isLawyer={isLawyer} />
				<ReviewDocumentsSection reviewId={reviewId} isLawyer={isLawyer} />
				{!isLawyer && <ReviewPaymentSection reviewId={reviewId} />}
				{!isLawyer && <ReviewCancel reviewId={reviewId} />}
				{isLawyer && <ReviewClose reviewId={reviewId} />}
			</Flex>
		</Box>
	)
}

const StatusBox: FC<{ status: ReviewStatus }> = ({ status }) => (
	<Box>
		<Text>Status</Text>
		<Text fontSize="xl" fontWeight={"semibold"}>
			{" "}
			{status}
		</Text>
	</Box>
)

const LawyerBox: FC<{ lawyer: ILawyer }> = ({ lawyer }) => (
	<Box>
		<Text>Lawyer</Text>
		<Text fontSize="xl" fontWeight={"semibold"}>
			{lawyer.name}
		</Text>
	</Box>
)

const UserBox: FC<{ user: IUser }> = ({ user }) => (
	<Box>
		<Text>User</Text>
		<Text fontSize="xl" fontWeight={"semibold"}>
			{user.name}
		</Text>
	</Box>
)

const DateBox: FC<{ date: string }> = ({ date }) => (
	<Box>
		<Text>Issue Date</Text>
		<Text fontSize="xl" fontWeight={"semibold"}>
			{normalizeDate(date)}
		</Text>
	</Box>
)

const PriceBox: FC<{ price: number }> = ({ price }) => (
	<Box>
		<Text>Price</Text>
		<Text fontSize="xl" fontWeight={"semibold"}>
			{formatInr(price)} INR
		</Text>
	</Box>
)
