import { Box, Button, Center, Flex, Heading, Text } from "@chakra-ui/react"
import _ from "lodash"
import { FC, useEffect } from "react"
import { Navigate, NavLink } from "react-router-dom"
import { CenteredSpinner } from "../../shared/components/ui/CenterSpinner"
import { useLawyerAuth } from "../useLawyerAuth"
import { useLawyerStore } from "../useLawyerStore"
import { LawyerDetailsUpdateDrawer } from "./lawyerDetailsUpdate/LawyerDetailsUpdateDrawer"
import { useLawyerUpdateStore } from "./lawyerDetailsUpdate/useLawyerUpdateStore"
import { LawyerProfilePicture } from "./lawyerProfilePicture/LawyerProfilePicture"
import { LawyerProofs } from "./lawyerProofs/LawyerProofs"

export const LawyerStatus: FC = () => {
	const { token } = useLawyerAuth()
	const { lawyer, fetchLawyer } = useLawyerStore()
	const { setIsDrawerOpen } = useLawyerUpdateStore()

	useEffect(() => {
		if (_.isUndefined(lawyer)) fetchLawyer({ token })
	}, [fetchLawyer, token, lawyer])

	if (_.isUndefined(lawyer)) return <CenteredSpinner />
	if (!lawyer) return <Navigate to={"/lawyer/register"} />
	if (lawyer.isVerified) return <Navigate to={"/lawyer"} />

	return (
		<Center>
			<Box padding={10} maxW={"2xl"} textAlign="center">
				<Heading size={"lg"}>Waiting for Verification</Heading>
				<Text mt={1}>
					It usually takes 3-4 business days for verification process. You might get
					a telephone verification call on provided contact number.
				</Text>
				<Flex mt={8} p={4} gap={6} bgColor="gray.200" borderRadius={"lg"}>
					<LawyerProfilePicture />
					<Box textAlign={"left"}>
						<Heading size={"md"}>{lawyer.name}</Heading>
						<Text>{lawyer.description}</Text>
						<Text>City: {lawyer.city.name}</Text>
						<Text>{lawyer.address}</Text>
						<Text>Contact: {lawyer.phone}</Text>
						<Button
							size={"xs"}
							mt={1}
							colorScheme="blackAlpha"
							onClick={() => setIsDrawerOpen(true)}
						>
							Update Details
						</Button>
						<LawyerDetailsUpdateDrawer />
					</Box>
				</Flex>
				<Box mt={8} textAlign="left">
					<LawyerProofs />
				</Box>
				<Box mt={8} textAlign="left">
					<NavLink to="/logout">
						<Button size={"sm"}>Logout</Button>
					</NavLink>
				</Box>
			</Box>
		</Center>
	)
}
