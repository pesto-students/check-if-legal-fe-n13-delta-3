import { Box, Center, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { FC, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { formatInr, getTransactionId, normalizeDateTime } from "../../../utils/helpers"
import { CenteredSpinner } from "../../shared/components/ui/CenterSpinner"
import { PaginationBox } from "../../shared/components/ui/PaginationBox"
import { usePagination } from "../../shared/hooks/usePagination"
import { useUserAuth } from "../useUserAuth"
import { usePaymentListQuery } from "./paymentList.query"

export const PaymentListView: FC = () => {
	const { token } = useUserAuth()
	const navigate = useNavigate()
	const limit = 10
	const pagination = usePagination(limit)

	const { data, isLoading } = usePaymentListQuery({
		token,
		pageNo: pagination.currentPage,
		limit,
	})

	useEffect(() => {
		if (data?.countPayments) pagination.setTotalItems(data.countPayments)
	}, [data?.countPayments, pagination])

	if (isLoading) return <CenteredSpinner />
	const payments = data?.payments
	const toShowPagination = pagination.totalItems > limit

	return (
		<Box>
			{/** For Desktop */}
			<Table size="sm" fontSize={"lg"} mt={4}>
				<Thead>
					<Tr>
						<Th>Transaction ID</Th>
						<Th>Intent ID</Th>
						<Th>Status</Th>
						<Th isNumeric>Amount</Th>
						<Th isNumeric>Last Issue At</Th>
					</Tr>
				</Thead>
				<Tbody>
					{payments?.map((payment) => (
						<Tr
							key={payment.id}
							cursor="pointer"
							_hover={{ backgroundColor: "gray.100" }}
							onClick={() => {
								navigate(`/user/review/${payment.reviewId}/details`)
							}}
						>
							<Td>{getTransactionId(payment)}</Td>
							<Td>{payment.reviewId}</Td>
							<Td>{payment.status}</Td>
							<Td isNumeric>{formatInr(payment.amountInPaisa / 100)}</Td>
							<Td isNumeric>{normalizeDateTime(payment.updatedAt)}</Td>
						</Tr>
					))}
				</Tbody>
			</Table>

			{toShowPagination && (
				<Center my={4}>
					<PaginationBox size={"sm"} {...pagination} />
				</Center>
			)}
		</Box>
	)
}