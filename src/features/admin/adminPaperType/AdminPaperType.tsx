import { Box, Button, useDisclosure } from "@chakra-ui/react"
import { FC, useEffect } from "react"
import { SidebarLayout } from "../../shared/components/sidebar/SidebarLayout"
import { AuthRole } from "../../../utils/enums"
import { usePaperTypeStore } from "../../shared/paperType/usePaperTypeStore"
import { useAdminAuth } from "../useAdminAuth"
import { PaperTypeAddDrawer } from "./paperTypeAdd/PaperTypeAddDrawer"
import { PaperTypeDeleteDialog } from "./paperTypeDelete/PaperTypeDeleteDialog"
import { PaperTypeListView } from "./PaperTypeListView"
import { PaperTypeUpdateDrawer } from "./paperTypeUpdate/PaperTypeUpdateDrawer"

export const AdminPaperType: FC = () => {
	useAdminAuth()
	const fetchPaperTypes = usePaperTypeStore((state) => state.fetchPaperTypes)

	useEffect(() => {
		fetchPaperTypes()
	}, [fetchPaperTypes])

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
