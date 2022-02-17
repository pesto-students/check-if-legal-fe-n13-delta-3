import { Box, Button, useDisclosure } from "@chakra-ui/react"
import { FC, useEffect } from "react"
import { AuthRole } from "../../../utils/enums"
import { OfferingList } from "./OfferingList"
import { SidebarLayout } from "../../shared/components/sidebar/SidebarLayout"
import { useVerifiedLawyerAuth } from "../useVerifiedLawyerAuth"
import { useLawyerOfferingStore } from "./useLawyerOfferingStore"
import { OfferingAddDrawer } from "./offeringAdd/OfferingAddDrawer"
import { OfferingDeleteDialog } from "./offeringDelete/OfferingDeleteDialog"

export const LawyerOffering: FC = () => {
	const { token } = useVerifiedLawyerAuth()
	const { fetchOfferings } = useLawyerOfferingStore()

	useEffect(() => {
		fetchOfferings({ token })
	}, [fetchOfferings, token])

	const offeringAddDrawerDisclosure = useDisclosure()

	return (
		<SidebarLayout role={AuthRole.LAWYER} headingText="Offerings">
			<Box>
				<Box m={4}>
					<Button
						size={"sm"}
						colorScheme="blue"
						onClick={() => offeringAddDrawerDisclosure.onOpen()}
					>
						Add Offering
					</Button>
				</Box>

				<OfferingList />
			</Box>

			<OfferingAddDrawer {...offeringAddDrawerDisclosure} />
			<OfferingDeleteDialog />
			{/* <CityUpdateDrawer /> */}
		</SidebarLayout>
	)
}
