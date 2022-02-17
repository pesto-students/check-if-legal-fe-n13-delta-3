import { Box, Heading, Text, Link } from "@chakra-ui/react"
import { FC } from "react"
import { NavLink } from "react-router-dom"
import { formatInr } from "../../../utils/helpers"

export const PriceBox: FC<{ price?: number }> = ({ price }) => {
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
