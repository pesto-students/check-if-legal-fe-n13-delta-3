import { Box, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { FC, useEffect, useState } from "react"
import { formatInr } from "../../../utils/helpers"
import { useUserAuth } from "../useUserAuth"
import { apiGetPaymentList } from "./paymentGet.api"

export const PaymentListView: FC = () => {
	const { token } = useUserAuth()
	const [paymentList, setPaymentList] = useState<any[]>()

	useEffect(() => {
		const getpaymentList = async () => {
			let list = await apiGetPaymentList({ token })
			setPaymentList(list)
		}
		getpaymentList()
	}, [token])

    if (!paymentList && paymentList ) return <Box>Payments  not found</Box>

	return (
		<Table size="sm" fontSize={"lg"} mt={4}>
			<Thead>
				<Tr>
					<Th>reviewId</Th>
					<Th>orderId</Th>
					<Th>Paid Amount</Th>
					<Th>status</Th>
				</Tr>
			</Thead>
			<Tbody>
				{paymentList &&
					paymentList?.map((ins) => (
						<Tr
							key={ins.id}
							cursor="pointer"
							_hover={{ backgroundColor: "gray.100" }}
						>
							<Td>{ins.reviewId}</Td>
							<Td>{ins.orderId}</Td>
							<Td>{formatInr(ins.amountInPaisa)}</Td>
							<Td>{ins.status}</Td>
						</Tr>
					))}
			</Tbody>
		</Table>
	)
}
