import {
	Button,
	AlertDialog,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogBody,
	AlertDialogFooter,
} from "@chakra-ui/react"
import React, { ComponentProps } from "react"
import { ErrorText } from "./ErrorText"

export const Dialog = ({
	title,
	subtitle,
	cancelText,
	approveText,
	approveButtonColorScheme,
	errorMessage,
	isOpen,
	cancelRef,
	onCancel,
	onApprove,
	isLoading,
	extendedBody,
}: {
	title: string
	subtitle?: string | JSX.Element
	cancelText?: string
	approveText?: string
	approveButtonColorScheme?: ComponentProps<typeof Button>["colorScheme"]
	errorMessage?: string | null
	isOpen: boolean
	cancelRef?: React.MutableRefObject<null>
	onCancel?: Function
	onApprove?: Function
	isLoading?: boolean
	extendedBody?: JSX.Element
}) => {
	return (
		<AlertDialog
			isOpen={isOpen}
			leastDestructiveRef={cancelRef}
			onClose={() => (onCancel ? onCancel() : null)}
		>
			<AlertDialogOverlay>
				<AlertDialogContent>
					<AlertDialogHeader fontSize="lg" fontWeight="bold">
						{title}
					</AlertDialogHeader>

					<AlertDialogBody>
						{subtitle ?? `Are you sure? You can't undo this action afterwards.`}

						{errorMessage && <ErrorText text="errorMessage" />}

						{extendedBody}
					</AlertDialogBody>

					<AlertDialogFooter>
						<Button ref={cancelRef} onClick={() => (onCancel ? onCancel() : null)}>
							{cancelText ?? "No"}
						</Button>
						<Button
							colorScheme={approveButtonColorScheme ?? "blue"}
							onClick={() => (onApprove ? onApprove() : null)}
							ml={3}
							isLoading={isLoading}
							isDisabled={isLoading}
						>
							{approveText ?? "Yes"}
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	)
}
