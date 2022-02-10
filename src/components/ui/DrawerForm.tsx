import {
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
} from "@chakra-ui/react"
import { ComponentProps, FC, FormEventHandler } from "react"

interface Props extends ComponentProps<typeof Drawer> {
	isSubmitting?: boolean
	headingText?: string
	submitLabel?: string
	onSubmit?: FormEventHandler<HTMLFormElement>
}

export const DrawerForm: FC<Props> = ({
	children,
	headingText,
	submitLabel,
	isSubmitting,
	onSubmit,
	...rest
}) => (
	<Drawer {...rest}>
		<DrawerOverlay />
		<form onSubmit={onSubmit}>
			<DrawerContent>
				<DrawerCloseButton />
				<DrawerHeader borderBottomWidth="1px" fontWeight={"bold"} py={"2"}>
					{headingText ?? "Drawer Heading"}
				</DrawerHeader>
				<DrawerBody>{children}</DrawerBody>

				<DrawerFooter borderTopWidth="1px" py={"2"}>
					<Button variant="outline" mr={3} onClick={rest.onClose}>
						Cancel
					</Button>
					<Button
						type="submit"
						colorScheme="blue"
						disabled={isSubmitting}
						isLoading={isSubmitting}
					>
						{submitLabel ?? "Submit"}
					</Button>
				</DrawerFooter>
			</DrawerContent>
		</form>
	</Drawer>
)
