import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
} from "@chakra-ui/react"
import { ComponentProps, FC } from "react"

interface Props extends ComponentProps<typeof Drawer> {
	headingText?: string
}

export const BasicDrawer: FC<Props> = ({ children, headingText, ...rest }) => (
	<Drawer {...rest}>
		<DrawerOverlay />
		<DrawerContent>
			<DrawerCloseButton />
			<DrawerHeader borderBottomWidth="1px" fontWeight={"bold"} py={"2"}>
				{headingText ?? "Drawer Heading"}
			</DrawerHeader>
			<DrawerBody>{children}</DrawerBody>
		</DrawerContent>
	</Drawer>
)
