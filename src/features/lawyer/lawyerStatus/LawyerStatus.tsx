import {
	Box,
	Button,
	Center,
	Flex,
	Heading,
	Stack,
	Text,
	useDisclosure,
} from "@chakra-ui/react"
import { FC } from "react"
import { Navigate, NavLink } from "react-router-dom"
import { CenteredSpinner } from "../../shared/components/ui/CenterSpinner"
import { useLawyerQuery } from "../lawyer.query"
import { useLawyerAuth } from "../useLawyerAuth"
import { LawyerDetailsUpdateDrawer } from "./lawyerDetailsUpdate/LawyerDetailsUpdateDrawer"
import { LawyerProfilePicture } from "./lawyerProfilePicture/LawyerProfilePicture"
import { LawyerProofs } from "./lawyerProofs/components/LawyerProofs"

export const LawyerStatus: FC = () => {
	const { token } = useLawyerAuth()
	const { data: lawyer, isLoading } = useLawyerQuery({ token })
	const updateDrawer = useDisclosure()

	if (isLoading) return <CenteredSpinner />
	if (!lawyer) return <Navigate to={"/lawyer/register"} />
	if (lawyer.isVerified) return <Navigate to={"/lawyer"} />

	return (
		<Center>
			<Box padding={10} maxW={"2xl"} textAlign={{ base: "left", md: "center" }}>
				<Heading size={"xl"}>Waiting for Verification</Heading>
				<Text mt={1}>
					It usually takes 3-4 business days for verification process. You might get
					a telephone verification call on provided contact number.
				</Text>
				<Flex
					mt={8}
					p={8}
					gap={6}
					bgColor="gray.200"
					borderRadius={"lg"}
					justifyContent="space-between"
					direction={{ base: "column", md: "row" }}
				>
					<Stack textAlign={"left"}>
						<Heading size={"lg"}>{lawyer.name}</Heading>
						<Box>
							<Text fontWeight={"semibold"}>Description:</Text>
							<Text>{lawyer.description}</Text>
						</Box>
						<Box>
							<Text fontWeight={"semibold"}>Address:</Text>
							<Text>{lawyer.address}</Text>
						</Box>
						<Text>
							<b>City:</b> {lawyer.city.name}
						</Text>
						<Text>
							<b>Contact:</b> {lawyer.phone}
						</Text>
						<Button
							size={"sm"}
							mt={2}
							colorScheme="blackAlpha"
							onClick={updateDrawer.onOpen}
						>
							Update Details
						</Button>
					</Stack>
					<Box>
						<LawyerProfilePicture />
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

			{lawyer && <LawyerDetailsUpdateDrawer lawyer={lawyer} {...updateDrawer} />}
		</Center>
	)
}
