import { Box, Button, useDisclosure } from "@chakra-ui/react"
import { FC } from "react"
import { AuthRole } from "../../../utils/enums"
import { SidebarLayout } from "../../shared/components/sidebar/SidebarLayout"
import { useAdminAuth } from "../useAdminAuth"
import { CityAddDrawer } from "./cityAdd/CityAddDrawer"
import { CityListView } from "./CityListView"

export const AdminCity: FC = () => {
	useAdminAuth()
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
		</SidebarLayout>
	)
}
