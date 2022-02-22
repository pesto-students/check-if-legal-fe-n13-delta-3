import { Avatar, Box, Button, chakra, Heading, Stack, Text } from "@chakra-ui/react"
import { FC } from "react"
import { getLawyerProfileUrl } from "../../../utils/helpers"
import { BasicDrawer } from "../../shared/components/ui/BasicDrawer"
import { IPaperType } from "../../shared/paperType/IPaperType"
import { IUserOffering } from "../IUserOffering"

interface IProps {
	offering: IUserOffering
	paperType: IPaperType
	isOpen: boolean
	onClose: () => void
}

export const OfferingDetailsDrawer: FC<IProps> = ({
	offering,
	paperType,
	isOpen,
	onClose,
}) => {
	return (
		<BasicDrawer
			headingText="Lawyer Details"
			size={"sm"}
			onClose={onClose}
			isOpen={isOpen}
		>
			<Stack maxWidth={"sm"} marginX={"auto"}>
				<Avatar
					size={"2xl"}
					my={2}
					name={offering.lawyer.name}
					src={getLawyerProfileUrl(offering.lawyer.id)}
				/>
				<Heading>{offering.lawyer.name}</Heading>
				<Box>
					<Text fontWeight={"semibold"}>Description:</Text>
					<Text>{offering.lawyer.description}</Text>
				</Box>
				<Box>
					<Text fontWeight={"semibold"}>Address:</Text>
					<Text>{offering.lawyer.address}</Text>
				</Box>
				<Box>
					{offering.price && (
						<>
							<Text fontWeight={"bold"}>
								INR <chakra.span fontSize="2xl">{offering.price}</chakra.span>
							</Text>
							<chakra.span fontWeight={"normal"}>
								For {paperType.name} Review
							</chakra.span>
						</>
					)}

					<Text>{offering.expectedTimeInHours} Hours expected duration</Text>
				</Box>
				<Box>
					<Button size={"sm"} onClick={onClose}>
						Close
					</Button>
				</Box>
			</Stack>
		</BasicDrawer>
	)
}
