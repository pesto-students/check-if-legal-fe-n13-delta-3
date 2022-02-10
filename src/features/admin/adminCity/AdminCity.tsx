import { Box, Button, useDisclosure } from "@chakra-ui/react"
import { FC, useEffect } from "react"
import { SidebarLayout } from "../../../components/sidebar/SidebarLayout"
import { AuthRole } from "../../../utils/enums"
import { useAdminAuth } from "../useAdminAuth"
import { CityAddDrawer } from "./cityAdd/CityAddDrawer"
import { CityDeleteDialog } from "./cityDelete/CityDeleteDialog"
import { CityListView } from "./CityListView"
import { useCityStore } from "../../city/useCityStore"
import { useStateStore } from "../../state/useStateStore"
import { CityUpdateDrawer } from "./cityUpdate/CityUpdateDrawer"

export const AdminCity: FC = () => {
	useAdminAuth()
	const fetchCities = useCityStore((state) => state.fetchCities)
	const fetchStates = useStateStore((state) => state.fetchStates)

	useEffect(() => {
		fetchCities()
		fetchStates()
	}, [fetchCities, fetchStates])

	const cityAddDrawerDisclosure = useDisclosure()

	return (
		<SidebarLayout role={AuthRole.ADMIN} headingText="Cities">
			<Box>
				<Box m={4}>
					<Button
						size={"sm"}
						colorScheme="blue"
						onClick={() => cityAddDrawerDisclosure.onOpen()}
					>
						Add City
					</Button>
				</Box>

				<CityListView />
			</Box>

			<CityAddDrawer {...cityAddDrawerDisclosure} />
			<CityDeleteDialog />
			<CityUpdateDrawer />
		</SidebarLayout>
	)
}
