import { Avatar, Box, Button, Flex, Heading, Text } from "@chakra-ui/react"
import { FC, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getErrorMessage } from "../../../utils/helpers"
import { storage } from "../../../utils/storage"
import { CenteredSpinner } from "../../shared/components/ui/CenterSpinner"
import { ErrorText } from "../../shared/components/ui/ErrorText"
import { useErrorToast } from "../../shared/hooks/useErrorToast"
import { useSuccessToast } from "../../shared/hooks/useSuccessToast"
import { apiReviewCreate } from "../reviewCreate.api"
import { useUserOfferingsQuery } from "../userOffering.query"
import { useUserOfferingStore } from "../userOffering.store"
import { PriceBox } from "./PriceBox"

export const OfferingList: FC = () => {
	const authPayload = storage.getAuth()
	const token = authPayload?.token

	const navigate = useNavigate()
	const errorToast = useErrorToast()
	const successToast = useSuccessToast()

	const [isLoading, setIsLoading] = useState(false)
	const { city, language, paperType } = useUserOfferingStore()

	const {
		data: offerings,
		isLoading: isOfferingsLoading,
		error,
		refetch,
	} = useUserOfferingsQuery({ city, paperType, language, token })

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
	if (!offerings) return <Box>No Offerings</Box>

	return (
		<Box>
			<Heading size={"lg"} m={2}>
				Select Lawyer for Review
			</Heading>
			{offerings.map((offering) => (
				<Box
					key={offering.id}
					m={2}
					p={4}
					border="1px"
					borderColor={"gray.300"}
					borderRadius={"lg"}
				>
					<Flex gridGap="4">
						<Box>
							<Avatar />
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
								<Button as={Button} mt={2} size={"sm"}>
									View Profile
								</Button>
							</Box>
						</Box>
						<Box textAlign={"center"} my="auto" px={"4"}>
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
		</Box>
	)
}
