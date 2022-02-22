import { Box, Button, Heading, Text, useDisclosure } from "@chakra-ui/react"
import { FC } from "react"
import { useVerifiedLawyerAuth } from "../../useVerifiedLawyerAuth"
import { BankUpdateDrawer } from "./BankUpdateDrawer"
import { useLawyerBankQuery } from "./lawyerBank.query"

export const Bank: FC = () => {
	const { token } = useVerifiedLawyerAuth()
	const { data: lawyerBank } = useLawyerBankQuery({ token })
	const bankUpdateDrawer = useDisclosure()

	return (
		<Box>
			<Heading size={"md"}>Bank Details</Heading>
			<BankUpdateDrawer {...bankUpdateDrawer} />

			{lawyerBank && (
				<Box>
					<Text>Bank: {lawyerBank.bankName}</Text>
					<Text>IFSC: {lawyerBank.bankIfsc}</Text>
					<Text>Account No: {lawyerBank.accountNumber}</Text>
					<Button size={"sm"} mt={1} onClick={bankUpdateDrawer.onOpen}>
						Update Bank Details
					</Button>
				</Box>
			)}

			{!lawyerBank && (
				<Box>
					<Text>Add bank details for future review payouts</Text>
					<Button
						size={"sm"}
						colorScheme={"blue"}
						mt={1}
						onClick={bankUpdateDrawer.onOpen}
					>
						Add Bank Details
					</Button>
				</Box>
			)}
		</Box>
	)
}
