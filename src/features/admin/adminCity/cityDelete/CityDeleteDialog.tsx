import { FC, useCallback, useState } from "react"
import { getErrorMessage } from "../../../../utils/helpers"
import { useCityListData } from "../../../shared/city/cityList.query"
import { ICity } from "../../../shared/city/ICity"
import DeleteItemDialog from "../../../shared/components/ui/DeleteItemDialog"
import { useErrorToast } from "../../../shared/hooks/useErrorToast"
import { useSuccessToast } from "../../../shared/hooks/useSuccessToast"
import { useAdminAuth } from "../../useAdminAuth"
import { apiCityDelete } from "./cityDelete.api"

interface IProps {
	isOpen: boolean
	onClose: () => void
	city: ICity
}

export const CityDeleteDialog: FC<IProps> = ({ isOpen, onClose, city }) => {
	const { token } = useAdminAuth()
	const { refetch: refetchCities } = useCityListData()

	const successToast = useSuccessToast()
	const errorToast = useErrorToast()
	const [isLoading, setIsLoading] = useState(false)

	const onDelete = useCallback(() => {
		setIsLoading(true)
		apiCityDelete({ id: city.id }, token)
			.then(() => {
				successToast("City deleted successfully")
				onClose()
				refetchCities()
			})
			.catch((error) => errorToast(getErrorMessage(error)))
			.finally(() => setIsLoading(false))
	}, [city, onClose, refetchCities, token, errorToast, successToast])

	return (
		<DeleteItemDialog
			title={`Delete City: ${city.name}`}
			isOpen={isOpen}
			onCancel={onClose}
			onDelete={onDelete}
			isLoading={isLoading}
		/>
	)
}
