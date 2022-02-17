import { Box, Button, useDisclosure } from "@chakra-ui/react"
import { FC, useEffect } from "react"
import { AuthRole } from "../../../utils/enums"
import { SidebarLayout } from "../../shared/components/sidebar/SidebarLayout"
import { useVerifiedLawyerAuth } from "../useVerifiedLawyerAuth"
import { BankAddDrawer } from "./bankAdd/BankAddDrawer"
import { BankDeleteDialog } from "./bankDelete/BankDeleteDialog"
import { BankList } from "./BankList"
import { useLawyerBankStore } from "./useLawyerBankStore"

export const LawyerBank: FC = () => {
	const { token } = useVerifiedLawyerAuth()
	const { fetchBanks } = useLawyerBankStore()

	useEffect(() => {
		fetchBanks({ token })
	}, [fetchBanks, token])

	const offeringAddDrawerDisclosure = useDisclosure()

	return (
		<SidebarLayout role={AuthRole.LAWYER} headingText="Banks">
			<Box>
				<Box m={4}>
					<Button
						size={"sm"}
						colorScheme="blue"
						onClick={() => offeringAddDrawerDisclosure.onOpen()}
					>
						Add Bank
					</Button>
				</Box>

				<BankList />
			</Box>

			<BankAddDrawer {...offeringAddDrawerDisclosure} />
			<BankDeleteDialog />
		</SidebarLayout>
	)
}
