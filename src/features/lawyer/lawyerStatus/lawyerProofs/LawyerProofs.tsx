import { Box, Heading } from "@chakra-ui/react"
import { FC } from "react"
import { LawyerProofList } from "./LawyerProofList"
import { UploadProofsForm } from "./UploadProofsForm"

export const LawyerProofs: FC = () => {
	return (
		<Box>
			<Heading size={"md"}>Identity Proof Documents</Heading>
			<LawyerProofList />
			<UploadProofsForm />
		</Box>
	)
}
