import { Box, Button, useDisclosure } from "@chakra-ui/react"
import { FC } from "react"
import { AuthRole } from "../../../utils/enums"
import { SidebarLayout } from "../../shared/components/sidebar/SidebarLayout"
import { useAdminAuth } from "../useAdminAuth"
import { PaperTypeAddDrawer } from "./paperTypeAdd/PaperTypeAddDrawer"
import { PaperTypeDeleteDialog } from "./paperTypeDelete/PaperTypeDeleteDialog"
import { PaperTypeListView } from "./PaperTypeListView"
import { PaperTypeUpdateDrawer } from "./paperTypeUpdate/PaperTypeUpdateDrawer"

export const AdminPaperType: FC = () => {
	useAdminAuth()
	const cityAddDrawerDisclosure = useDisclosure()

	return (
		<SidebarLayout role={AuthRole.ADMIN} headingText="Paper Types">
			<Box>
				<Box m={4}>
					<Button
						size={"sm"}
						colorScheme="blue"
						onClick={() => cityAddDrawerDisclosure.onOpen()}
					>
						Add Paper Type
					</Button>
				</Box>

				<PaperTypeListView />
			</Box>

			<PaperTypeAddDrawer {...cityAddDrawerDisclosure} />
			<PaperTypeDeleteDialog />
			<PaperTypeUpdateDrawer />
		</SidebarLayout>
	)
}
