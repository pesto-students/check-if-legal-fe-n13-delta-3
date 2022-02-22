import { Box, Button, useDisclosure } from "@chakra-ui/react"
import { FC } from "react"
import { AuthRole } from "../../../utils/enums"
import { SidebarLayout } from "../../shared/components/sidebar/SidebarLayout"
import { useAdminAuth } from "../useAdminAuth"
import { LanguageAddDrawer } from "./languageAdd/LanguageAddDrawer"
import { LanguageDeleteDialog } from "./languageDelete/LanguageDeleteDialog"
import { LanguageListView } from "./LanguageListView"
import { LanguageUpdateDrawer } from "./languageUpdate/LanguageUpdateDrawer"

export const AdminLanguage: FC = () => {
	useAdminAuth()
	const cityAddDrawerDisclosure = useDisclosure()

	return (
		<SidebarLayout role={AuthRole.ADMIN} headingText="Languages">
			<Box>
				<Box m={4}>
					<Button
						size={"sm"}
						colorScheme="blue"
						onClick={() => cityAddDrawerDisclosure.onOpen()}
					>
						Add Language
					</Button>
				</Box>

				<LanguageListView />
			</Box>

			<LanguageAddDrawer {...cityAddDrawerDisclosure} />
			<LanguageDeleteDialog />
			<LanguageUpdateDrawer />
		</SidebarLayout>
	)
}
