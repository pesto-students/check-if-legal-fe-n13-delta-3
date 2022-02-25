import { useCallback } from "react"
import { useQuery, useQueryClient } from "react-query"
import { ICity } from "../shared/city/ICity"
import { ILanguage } from "../shared/language/ILanguage"
import { IPaperType } from "../shared/paperType/IPaperType"
import { apiUserOfferingList } from "./apis/userOfferingList.api"
import { apiUserOfferingListCountGet } from "./apis/userOfferingListCountGet.api"
import { IUserOffering } from "./IUserOffering"

type IDataShape = { offerings: IUserOffering[]; countOfferings: number }

function getQueryKey(pageNo: number) {
	return ["userOfferingList", pageNo]
}

export function useUserOfferingsQuery({
	city,
	language,
	paperType,
	token,
	pageNo,
	limit,
}: {
	paperType?: IPaperType
	language?: ILanguage
	city?: ICity
	token?: string
	pageNo: number
	limit: number
}) {
	return useQuery<IDataShape, Error>(getQueryKey(pageNo), async () => {
		const cityId = city?.id
		const languageId = language?.id
		const paperTypeId = paperType?.id

		if (cityId && languageId && paperTypeId) {
			const [offerings, countOfferings] = await Promise.all([
				apiUserOfferingList({
					token,
					cityId,
					languageId,
					paperTypeId,
					pageNo,
					limit,
				}),
				apiUserOfferingListCountGet({ cityId, languageId, paperTypeId }),
			])
			return { offerings, countOfferings }
		}
		return { offerings: [], countOfferings: 0 }
	})
}

export function useUserOfferingsData(pageNo: number) {
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
