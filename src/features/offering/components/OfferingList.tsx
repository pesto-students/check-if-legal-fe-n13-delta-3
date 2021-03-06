import {
	Avatar,
	Box,
	Button,
	Center,
	Flex,
	Heading,
	Text,
	useDisclosure,
} from "@chakra-ui/react"
import _ from "lodash"
import { FC, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getErrorMessage, getLawyerProfileUrl } from "../../../utils/helpers"
import { storage } from "../../../utils/storage"
import { CenteredSpinner } from "../../shared/components/ui/CenterSpinner"
import { EmptyState } from "../../shared/components/ui/EmptyState"
import { ErrorText } from "../../shared/components/ui/ErrorText"
import { PaginationBox } from "../../shared/components/ui/PaginationBox"
import { useErrorToast } from "../../shared/hooks/useErrorToast"
import { usePagination } from "../../shared/hooks/usePagination"
import { useSuccessToast } from "../../shared/hooks/useSuccessToast"
import { apiReviewCreate } from "../apis/reviewCreate.api"
import { IUserOffering } from "../IUserOffering"
import { useUserOfferingsQuery } from "../userOffering.query"
import { useUserOfferingStore } from "../userOffering.store"
import { OfferingDetailsDrawer } from "./OfferingDetailsDrawer"
import { PriceBox } from "./PriceBox"

export const OfferingList: FC = () => {
	const authPayload = storage.getAuth()
	const token = authPayload?.token

	const limit = 10
	const pagination = usePagination(limit)

	const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate()
	const errorToast = useErrorToast()
	const successToast = useSuccessToast()

	const [selectedOffering, setSelectedOffering] = useState<IUserOffering>()
	const detailsDrawer = useDisclosure()

	const city = useUserOfferingStore((st) => st.city)
	const language = useUserOfferingStore((st) => st.language)
	const paperType = useUserOfferingStore((st) => st.paperType)

	const {
		data,
		isLoading: isOfferingsLoading,
		error,
		refetch,
	} = useUserOfferingsQuery({
		city,
		paperType,
		language,
		token,
		pageNo: pagination.currentPage,
		limit,
	})

	useEffect(() => {
		if (data?.countOfferings) pagination.setTotalItems(data.countOfferings)
	}, [data?.countOfferings, pagination])

	useEffect(() => {
		refetch()
	}, [city, language, paperType, refetch])

	const handleSelectOffering = (offeringId: number) => {
		if (city && token) {
			setIsLoading(true)
			apiReviewCreate({ offeringId, cityId: city.id, token })
				.then((res) => {
					successToast("Review opened successfully")
					navigate(`/user/review/${res.id}/details`)
				})
				.catch((err) => errorToast(getErrorMessage(err)))
				.finally(() => setIsLoading(false))
		}
	}

	if (isOfferingsLoading) return <CenteredSpinner />
	if (error) return <ErrorText text={getErrorMessage(error)} />

	const offerings = data?.offerings
	const toShowPagination = pagination.totalItems > limit

	if (_.isEmpty(offerings)) {
		return <EmptyState headingText="No Lawyers Found" />
	}

	return (
		<Box>
			<Heading size={"lg"} m={2}>
				Select Lawyer for Review
			</Heading>
			{offerings?.map((offering) => (
				<Box
					key={offering.id}
					m={2}
					p={4}
					border="1px"
					borderColor={"gray.300"}
					borderRadius={"lg"}
				>
					<Flex direction={{ base: "column", md: "row" }} gridGap="4">
						<Box>
							<Avatar
								size={"lg"}
								name={offering.lawyer.name}
								src={getLawyerProfileUrl(offering.lawyer.id)}
							/>
						</Box>
						<Box flexGrow={"1"}>
							<Heading size={"md"}>{offering.lawyer.name}</Heading>
							<Text maxW={"xl"}>
								{offering.description ?? offering.lawyer.description}
							</Text>
							<Text maxW={"xl"}>
								{offering.expectedTimeInHours} hours expected for review
							</Text>
							<Box>
								<Button
									as={Button}
									mt={2}
									size={"sm"}
									onClick={() => {
										setSelectedOffering(offering)
										detailsDrawer.onOpen()
									}}
								>
									View Profile
								</Button>
							</Box>
						</Box>
						<Box
							textAlign={{ base: "left", md: "center" }}
							my="auto"
							px={{ md: "4" }}
						>
							<PriceBox price={offering.price} paperType={paperType} />
							{token && (
								<Box>
									<Button
										as={Button}
										mt={2}
										size={"sm"}
										colorScheme="blue"
										onClick={() => handleSelectOffering(offering.id)}
										isLoading={isLoading}
										isDisabled={isLoading}
									>
										Select & Continue
									</Button>
								</Box>
							)}
						</Box>
					</Flex>
				</Box>
			))}

			{toShowPagination && (
				<Center my={4}>
					<PaginationBox size={"sm"} {...pagination} />
				</Center>
			)}

			{selectedOffering && paperType && (
				<OfferingDetailsDrawer
					paperType={paperType}
					offering={selectedOffering}
					{...detailsDrawer}
				/>
			)}
		</Box>
	)
}
