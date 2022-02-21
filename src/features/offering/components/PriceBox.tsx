import { Box, Heading, Link, Text } from "@chakra-ui/react"
import { FC } from "react"
import { NavLink } from "react-router-dom"
import { formatInr } from "../../../utils/helpers"
import { IPaperType } from "../../shared/paperType/IPaperType"

interface IProps {
	price?: number
	paperType?: IPaperType
}

export const PriceBox: FC<IProps> = ({ price, paperType }) => {
	if (price) {
		return (
			<Box>
				<Heading size={"md"}>INR {formatInr(price)}</Heading>
				{paperType && <Text size={"sm"}>For {paperType.name} Review</Text>}
			</Box>
		)
	}

	return (
		<Box>
			<Link as={NavLink} to="/login" state={"/offering"}>
				Login to get price
			</Link>
		</Box>
	)
}
