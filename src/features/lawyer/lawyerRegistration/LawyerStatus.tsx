import { Avatar, Box, Button, Center, Heading, Stack, Text } from "@chakra-ui/react"
import React, { FC, useState } from "react"
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react"
import default_profile from "../../../assests/default_profile.jpg"
import { PlusSquareIcon } from "@chakra-ui/icons"
import { DeleteIconButton } from "../../../components/ui/DeleteIconButton"

export const LawyerStatus: FC = () => {
	const [images, setImages] = useState<any[]>([])
	const addImages = async () => {
		setImages([])
	}
	const deleteIcon = (idx: any) => {
		console.log("--idx", idx)
	}
	return (
		<React.Fragment>
			<Box
				display="flex"
				flexDirection="column"
				alignItems="flex-start"
				ml={30}
				mt={10}
			>
				<Heading>Waiting for Verification</Heading>
				<Text>
					It usually takes 3-4 business days for verification process. You might get
					a tele-verification call for validation.
				</Text>
			</Box>
			<Box
				display="flex"
				flexDirection="column"
				alignItems="flex-start"
				h="130"
				w="500"
				bg="#F1F5F9"
				ml={30}
				mt={5}
				maxW="500"
				borderRadius={20}
			>
				<Center>
					<Avatar size="xl" ml={10} mt={2} src={default_profile}></Avatar>
					<Stack>
						<Heading>{"saitharun"}</Heading>
						<Text noOfLines={2} overflow="hidden" ml={3}>
							City:{}
						</Text>
						<Text noOfLines={2} overflow="hidden" ml={3}>
							mobile:{}
						</Text>
					</Stack>
				</Center>
			</Box>
			<Table variant="simple" size="md" width={500} ml={10} mt={5}>
				<Thead>
					<Tr>
						<Th>Images</Th>
						<Th>Delete</Th>
					</Tr>
				</Thead>
				{images ? (
					images.map((item: any, idx: any) => {
						;<Tbody>
							<Tr>
								<Td>inches{item}</Td>
								<Td>
									<DeleteIconButton onClick={() => deleteIcon(idx)} />
								</Td>
							</Tr>
						</Tbody>
					})
				) : (
					<h1>Images Not Found</h1>
				)}
			</Table>
			<Box
				display="flex"
				flexDirection="column"
				justifyContent="flex-start"
				alignItems="flex-start"
				mt={10}
				ml={10}
			>
				<Button
					variant="outline"
					size="sm"
					rightIcon={<PlusSquareIcon />}
					display="flex"
					flexDirection="row"
					backgroundColor="whatsapp.500"
					alignItems="center"
					fontWeight="bold"
					fontSize="xs"
					onClick={addImages}
					_hover={{
						bg: "whatsapp.500",
					}}
				>
					Upload File
				</Button>
			</Box>
			<Box
				display="flex"
				flexDirection="column"
				justifyContent="flex-start"
				alignItems="flex-start"
				mt={10}
				ml={10}
			>
				<Button
					variant="solid"
					size="sm"
					display="flex"
					flexDirection="row"
					alignItems="center"
					fontWeight="bold"
					fontSize="xs"
					color={"gray.800"}
					bg={"gray.400"}
					_hover={{
						bg: "gray.400",
					}}
				>
					Logout
				</Button>
			</Box>
		</React.Fragment>
	)
}
