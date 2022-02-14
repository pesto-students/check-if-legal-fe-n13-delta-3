import {
	Button,
	AlertDialog,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogBody,
	AlertDialogFooter,
} from "@chakra-ui/react"
import React from "react"
import { ErrorText } from "./ErrorText"

const DeleteItemDialog = ({
	title,
	subtitle,
	errorMessage,
	isOpen,
	cancelRef,
	onCancel,
	onDelete,
	isLoading,
	extendedBody,
}: {
	title: string
	subtitle?: string | JSX.Element
	errorMessage?: string | null
	isOpen: boolean
	cancelRef?: React.MutableRefObject<null>
	onCancel?: Function
	onDelete?: Function
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
							Not Now
						</Button>
						<Button
							colorScheme="red"
							onClick={() => (onDelete ? onDelete() : null)}
							ml={3}
							isLoading={isLoading}
							isDisabled={isLoading}
						>
							Delete
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	)
}

export default DeleteItemDialog
