import { Box, Heading, Link, Text } from "@chakra-ui/react"
import { FC } from "react"
import { NavLink } from "react-router-dom"
import { formatInr } from "../../../utils/helpers"

interface IProps {
	price?: number
}

export const PriceBox: FC<IProps> = ({ price }) => {
	if (price) {
		return (
			<Box>
				<Text size={"sm"}>INR</Text>
				<Heading size={"md"}>{formatInr(price)}</Heading>
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
