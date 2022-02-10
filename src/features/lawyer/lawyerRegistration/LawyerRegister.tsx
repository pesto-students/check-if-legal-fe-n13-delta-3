import React, { FC, useState } from "react"
import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Stack,
	useColorModeValue,
	Text,
	Avatar,
	AvatarBadge,
	IconButton,
	Center,
	Textarea,
	Select,
	Box,
} from "@chakra-ui/react"
import { EditIcon } from "@chakra-ui/icons"
import default_profile from "../../../assests/default_profile.jpg"
import { lawyerRegister } from "./services"

export const LawyerRegister: FC = () => {
	const [lawyerData, setLawyerData] = useState<any>({
		name: "",
		cityId: 1,
		address: "",
		description: "",
		phone: "",
	})

	const onDataChange = (value: any, id: any) => {
		setLawyerData({ ...lawyerData, [id]: value })
	}

	const onSubmit = async () => {
		try {
			await lawyerRegister(lawyerData)
		} catch (e) {}
	}
	const renderBody = () => {
		return (
			<Flex
				minH={"100vh"}
				align={"center"}
				justify={"center"}
				// eslint-disable-next-line react-hooks/rules-of-hooks
				bg={useColorModeValue("gray.50", "gray.800")}
			>
				<Stack
					spacing={4}
					w={"full"}
					maxW={"xl"}
					// eslint-disable-next-line react-hooks/rules-of-hooks
					bg={useColorModeValue("white", "gray.700")}
					rounded={"xl"}
					boxShadow={"lg"}
					p={6}
					my={12}
				>
					<Text
						display="flex"
						fontWeight="bold"
						fontSize="3xl"
						justifyContent="center"
						// eslint-disable-next-line react-hooks/rules-of-hooks
						bg={useColorModeValue("white", "gray.700")}
					>
						Lawyer Registration
					</Text>
					<FormControl id="userName">
						<FormLabel>User Icon</FormLabel>
						<Stack direction={["column", "row"]} spacing={8}>
							<Center>
								<Avatar size="xl" src={default_profile}>
									<AvatarBadge
										as={IconButton}
										size="sm"
										rounded="full"
										top="-10px"
										colorScheme="red"
										aria-label="remove Image"
										icon={<EditIcon />}
									/>
								</Avatar>
							</Center>
							<FormControl id="name" isRequired>
								<FormLabel>Name</FormLabel>
								<Input
									placeholder="Enter your Name"
									_placeholder={{ color: "gray.500" }}
									type="text"
									value={lawyerData.name}
									onChange={(_) => onDataChange(_.target.value, "name")}
								/>
							</FormControl>
						</Stack>
					</FormControl>
					<FormControl id="city" isRequired>
						<FormLabel>City of Practising</FormLabel>
						<Select
							defaultValue={"Mumbai"}
							onChange={(_) => onDataChange(_.target.value, "cityId")}
						>
							<option value="1">Mumbai</option>
							<option value="2">Gujarat</option>
						</Select>
					</FormControl>
					<FormControl id="address" isRequired>
						<FormLabel>Office Address</FormLabel>
						<Textarea
							placeholder="address"
							onChange={(_) => onDataChange(_.target.value, "address")}
							_placeholder={{ color: "gray.500" }}
							value={lawyerData.address}
						/>
					</FormControl>
					<FormControl id="description" isRequired>
						<FormLabel>description</FormLabel>
						<Textarea
							placeholder="Enter a small Description"
							onChange={(_) => onDataChange(_.target.value, "description")}
							_placeholder={{ color: "gray.500" }}
							value={lawyerData.description}
						/>
					</FormControl>
					<FormControl id="mobile" isRequired>
						<FormLabel>Mobile Number</FormLabel>
						<Input
							placeholder="Enter your Mobile Number"
							_placeholder={{ color: "gray.500" }}
							type="tel"
							id="mobile"
							value={lawyerData.phone}
							onChange={(_) => onDataChange(_.target.value, "phone")}
						/>
					</FormControl>
					<FormControl id="files" isRequired>
						<FormLabel>Upload Documents For Verification</FormLabel>
						<Box
							maxW="4000px"
							borderWidth="1px"
							borderRadius="lg"
							overflow="hidden"
						>
							<Text
								display="flex"
								fontWeight="bold"
								fontSize="xs"
								// eslint-disable-next-line react-hooks/rules-of-hooks
								bg={useColorModeValue("white", "gray.700")}
							>
								Upload Any Goverment approved ID and Lawyer Licence provided from
								Bar Council of India.
							</Text>
							<Box p="5">
								<Box display="flex" justifyContent="center">
									<Box
										color="gray.500"
										fontWeight="semibold"
										letterSpacing="wide"
										fontSize="xs"
										textTransform="uppercase"
										ml="2"
									>
										<Button
											color={"gray.600"}
											size="sm"
											bg={"gray.400"}
											_hover={{
												bg: "gray.400",
											}}
										>
											Upload Images
										</Button>
									</Box>
								</Box>
							</Box>
						</Box>
					</FormControl>
					{renderFooter()}
				</Stack>
			</Flex>
		)
	}

	const renderFooter = () => {
		return (
			<React.Fragment>
				<Stack direction={["column", "row"]} spacing="24px">
					<Button color={"gray.600"} w="full">
						Go Back
					</Button>
					<Button
						color={"gray.800"}
						bg={"gray.400"}
						w="full"
						_hover={{
							bg: "gray.400",
						}}
						onClick={() => onSubmit()}
					>
						Submit for Verification
					</Button>
				</Stack>
			</React.Fragment>
		)
	}
	return <React.Fragment>{renderBody()}</React.Fragment>
}
