import { Box, Button, useDisclosure } from "@chakra-ui/react"
import { FC, useEffect } from "react"
import { AuthRole } from "../../../utils/enums"
import { useCityListQuery } from "../../shared/city/cityList.query"
import { SidebarLayout } from "../../shared/components/sidebar/SidebarLayout"
import { useStateStore } from "../../shared/state/useStateStore"
import { useAdminAuth } from "../useAdminAuth"
import { CityAddDrawer } from "./cityAdd/CityAddDrawer"
import { CityDeleteDialog } from "./cityDelete/CityDeleteDialog"
import { CityListView } from "./CityListView"
import { CityUpdateDrawer } from "./cityUpdate/CityUpdateDrawer"

export const AdminCity: FC = () => {
	useAdminAuth()

	useCityListQuery()
	const fetchStates = useStateStore((state) => state.fetchStates)

	useEffect(() => {
		fetchStates()
	}, [fetchStates])

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
