import {
	Button,
	chakra,
	Flex,
	Icon,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	VisuallyHidden,
	Stack,
	Text,
} from "@chakra-ui/react"
import { ComponentProps, FC } from "react"
import { DropEvent, FileRejection, useDropzone } from "react-dropzone"
import { CenteredSpinner } from "../ui/CenterSpinner"

interface IProps extends Omit<ComponentProps<typeof Modal>, "children"> {
	title?: string
	contentText?: string
	multiple?: boolean
	accept?: string | string[]
	maxFiles?: number
	maxSize?: number
	isLoading?: boolean
	onDrop?: <T extends File>(
		acceptedFiles: T[],
		fileRejections: FileRejection[],
		event: DropEvent,
	) => void
}

export const FileUploadModal: FC<IProps> = ({
	title,
	isLoading,
	contentText,
	multiple,
	accept,
	maxFiles,
	maxSize,
	onDrop,
	...rest
}) => {
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		multiple,
		accept,
		maxFiles,
		maxSize,
	})

	return (
		<Modal {...rest}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{title ?? "Upload Files"}</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Flex
						mt={1}
						justify="center"
						px={6}
						pt={5}
						pb={6}
						borderWidth={2}
						borderColor={isDragActive ? "blue.400" : "gray.300"}
						borderStyle="dashed"
						rounded="md"
						{...getRootProps()}
					>
						<Stack spacing={1} textAlign="center">
							<Icon
								mx="auto"
								boxSize={12}
								color={"gray.400"}
								stroke="currentColor"
								fill="none"
								viewBox="0 0 48 48"
								aria-hidden="true"
							>
								<path
									d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</Icon>
							<Flex fontSize="sm" color={"gray.600"} alignItems="baseline">
								<chakra.label
									htmlFor="file-upload"
									cursor="pointer"
									rounded="md"
									fontSize="md"
									color={"brand.600"}
									pos="relative"
									_hover={{ color: "brand.400" }}
								>
									<span>
										Click to <b>select file</b> or <b>drag and drop</b>
									</span>
									<VisuallyHidden>
										<chakra.input disabled={isLoading} {...getInputProps()} />
									</VisuallyHidden>
								</chakra.label>
							</Flex>

							{isLoading ? (
								<CenteredSpinner />
							) : (
								<Text fontSize="xs" color={"gray.500"}>
									{contentText ?? ""}
								</Text>
							)}
						</Stack>
					</Flex>
				</ModalBody>

				<ModalFooter>
					<Button size={"sm"} mr={3} onClick={rest.onClose}>
						Close
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}
