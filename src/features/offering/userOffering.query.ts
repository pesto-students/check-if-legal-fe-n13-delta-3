import { useCallback } from "react"
import { useQuery, useQueryClient } from "react-query"
import { ICity } from "../shared/city/ICity"
import { ILanguage } from "../shared/language/ILanguage"
import { IPaperType } from "../shared/paperType/IPaperType"
import { IUserOffering } from "./IUserOffering"
import { apiUserOfferingList } from "./userOfferingList.api"

type IDataShape = IUserOffering[]
const queryKey = "userOffering"

export function useUserOfferingsQuery({
	city,
	language,
	paperType,
	token,
}: {
	paperType?: IPaperType
	language?: ILanguage
	city?: ICity
	token?: string
}) {
	return useQuery<IDataShape, Error>(queryKey, async () => {
		if (city && language && paperType) {
			return await apiUserOfferingList({
				token,
				cityId: city.id,
				languageId: language.id,
				paperTypeId: paperType.id,
			})
		}
		return []
	})
}

export function useUserOfferingsData() {
	const queryClient = useQueryClient()
	const data = queryClient.getQueryData<IDataShape>(queryKey)

	const refetch = useCallback(() => {
		queryClient.refetchQueries(queryKey)
	}, [queryClient])

	return { data, refetch }
}
