import { Avatar, Box, Button, Flex, Heading, Text } from "@chakra-ui/react"
import { FC, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getErrorMessage } from "../../../utils/helpers"
import { storage } from "../../../utils/storage"
import { CenteredSpinner } from "../../shared/components/ui/CenterSpinner"
import { ErrorText } from "../../shared/components/ui/ErrorText"
import { reviewCreateApi } from "../reviewCreateApi"
import { useOfferingStore } from "../useOfferingStore"
import { PriceBox } from "./PriceBox"

export const OfferingList: FC = () => {
	const authPayload = storage.getAuth()
	const token = authPayload?.token
	const navigate = useNavigate()

	const [error, setError] = useState<string>()
	const [isLoading, setIsLoading] = useState(false)

	const { offerings, isOfferingLoading, cityId } = useOfferingStore()

	const handleCreateReview = (offeringId: number) => {
		if (cityId && token) {
			setIsLoading(true)
			reviewCreateApi({ offeringId, cityId, token })
				.then((res) => navigate(`/user/review/${res.id}/details`))
				.catch((err) => setError(getErrorMessage(err)))
				.finally(() => setIsLoading(false))
		}
	}

	if (isOfferingLoading) return <CenteredSpinner />
	if (error) return <ErrorText text={error} />
	if (!offerings) return <Box>No Offerings</Box>

	return (
		<>
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

							<Button
								as={Button}
								mt={2}
								size={"sm"}
								colorScheme="blue"
								onClick={() => handleCreateReview(offering.id)}
								isLoading={isLoading}
								isDisabled={isLoading}
							>
								Select & Continue
							</Button>
						</Box>
						<Box textAlign={"center"} my="auto" px={"4"}>
							<PriceBox price={offering.price} />
						</Box>
					</Flex>
				</Box>
			))}
		</>
	)
}
