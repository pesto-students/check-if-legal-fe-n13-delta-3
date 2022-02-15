import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import { FC, useEffect } from "react"
import { normalizeDate, formatInr } from "../../../utils/helpers"
import { ILawyer } from "../../admin/adminLawyer/lawyerList/ILawyer"
import { IUser } from "../../user/IUser"
import { CenteredSpinner } from "../components/ui/CenterSpinner"
import { ReviewCancel } from "./reviewCancel/ReviewCancel"
import { ReviewDocuments } from "./reviewDocuments/ReviewDocuments"
import { ReviewNote } from "./reviewNote/ReviewNote"
import { useReviewDetailsStore } from "./useReviewDetailsStore"

interface IProps {
	token: string
	isLawyer: boolean
	reviewId: number
}

export const ReviewDetails: FC<IProps> = ({ token, reviewId, isLawyer }) => {
	const { review, isReviewLoading, fetchReview, setIsLawyer } = useReviewDetailsStore()

	useEffect(() => {
		setIsLawyer(isLawyer)
		fetchReview({ id: reviewId, token })
	}, [fetchReview, reviewId, token, isLawyer, setIsLawyer])

	if (!review || isReviewLoading) return <CenteredSpinner />

	return (
		<Box>
			<Heading size={"lg"}>{review.paperType.name}</Heading>
			<br />

			<Flex gap={"16"}>
				{!isLawyer && review.lawyer && <LawyerBox lawyer={review.lawyer} />}
				{isLawyer && review.user && <UserBox user={review.user} />}
				<DateBox date={review.createdAt} />
				<PriceBox price={review.price} />
			</Flex>
			<br />

			<ReviewNote />
			<br />
			<ReviewDocuments />
			<br />
			<ReviewCancel />
		</Box>
	)
}

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
