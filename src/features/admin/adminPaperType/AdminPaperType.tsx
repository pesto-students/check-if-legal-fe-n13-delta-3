import { Box, Button, useDisclosure } from "@chakra-ui/react"
import { FC, useEffect } from "react"
import { SidebarLayout } from "../../../components/sidebar/SidebarLayout"
import { AuthRole } from "../../../utils/enums"
import { usePaperTypeStore } from "../../paperType/usePaperTypeStore"
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
		<SidebarLayout role={AuthRole.ADMIN} headingText="Cities">
			<Box>
				<Box m={4}>
					<Button
						size={"sm"}
						colorScheme="blue"
						onClick={() => cityAddDrawerDisclosure.onOpen()}
					>
						Add PaperType
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
