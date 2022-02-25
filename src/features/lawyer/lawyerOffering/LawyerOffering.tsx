import { Box, Button, useDisclosure } from "@chakra-ui/react"
import { FC, useEffect } from "react"
import { AuthRole } from "../../../utils/enums"
import { SidebarLayout } from "../../shared/components/sidebarLayout/SidebarLayout"
import { useVerifiedLawyerAuth } from "../useVerifiedLawyerAuth"
import { OfferingAddDrawer } from "./offeringAdd/OfferingAddDrawer"
import { OfferingDeleteDialog } from "./offeringDelete/OfferingDeleteDialog"
import { LawyerOfferingList } from "./LawyerOfferingList"
import { OfferingUpdateDrawer } from "./offeringUpdate/OfferingUpdateDrawer"
import { useLawyerOfferingStore } from "./useLawyerOfferingStore"

export const LawyerOffering: FC = () => {
	const { token } = useVerifiedLawyerAuth()
	const { fetchOfferings } = useLawyerOfferingStore()

	useEffect(() => {
		fetchOfferings({ token })
	}, [fetchOfferings, token])

	const addDrawer = useDisclosure()

	return (
		<SidebarLayout role={AuthRole.LAWYER} headingText="Offerings">
			<Box>
				<Box m={4}>
					<Button size={"sm"} colorScheme="blue" onClick={addDrawer.onOpen}>
						Add Offering
					</Button>
				</Box>

				<LawyerOfferingList />
			</Box>

			<OfferingAddDrawer {...addDrawer} />
			<OfferingDeleteDialog />
			<OfferingUpdateDrawer />
		</SidebarLayout>
	)
}
