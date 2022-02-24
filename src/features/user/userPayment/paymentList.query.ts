import { useCallback } from "react"
import { useQuery, useQueryClient } from "react-query"
import { IReviewPayment } from "../../shared/reviewDetails/reviewPayment/IReviewPayment"
import { apiPaymentList } from "./paymentList.api"
import { apiPaymentListCountGet } from "./paymentListCountGet.api"

interface IDataShape {
	payments: IReviewPayment[]
	countPayments: number
}

function getQueryKey(page: number) {
	return ["payments", page]
}

export function usePaymentListQuery({
	token,
	pageNo,
	limit,
}: {
	token: string
	pageNo: number
	limit: number
}) {
	return useQuery<IDataShape, Error>(getQueryKey(pageNo), async () => {
		const [payments, countPayments] = await Promise.all([
			apiPaymentList({ token, pageNo, limit }),
			apiPaymentListCountGet({ token }),
		])
		return { payments, countPayments }
	})
}

export function usePaymentListData({ pageNo }: { pageNo: number }) {
	const queryClient = useQueryClient()
	const queryKey = getQueryKey(pageNo)

	const data = queryClient.getQueryData<IDataShape>(queryKey)
	const state = queryClient.getQueryState<IDataShape>(queryKey)
	const refetch = useCallback(
		() => queryClient.refetchQueries(queryKey),
		[queryClient, queryKey],
	)

	return { data, state, refetch }
}
