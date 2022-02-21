import { FC, useState } from "react"
import { getErrorMessage } from "../../../../utils/helpers"
import { useCityListData } from "../../../shared/city/cityList.query"
import DeleteItemDialog from "../../../shared/components/ui/DeleteItemDialog"
import { useAdminAuth } from "../../useAdminAuth"
import { cityDeleteApi } from "./cityDeleteApi"
import { useCityDeleteStore } from "./useCityDeleteStore"

export const CityDeleteDialog: FC = () => {
	const { token } = useAdminAuth()

	const { refetch: refetchCities } = useCityListData()
	const { selectedCity, isDeleteDialogOpen, setIsDeleteDialogOpen } =
		useCityDeleteStore()

	const [isLoading, setIsLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState<string>()

	if (!selectedCity) return null

	const handleCityDelete = () => {
		setIsLoading(true)
		cityDeleteApi({ id: selectedCity.id }, token)
			.then(() => {
				setIsDeleteDialogOpen(false)
				refetchCities()
			})
			.catch((error) => setErrorMessage(getErrorMessage(error)))
			.finally(() => setIsLoading(false))
	}

	if (!selectedCity) return null

	return (
		<DeleteItemDialog
			title={`Delete City: ${selectedCity.name}`}
			isOpen={isDeleteDialogOpen}
			onCancel={() => {
				setIsDeleteDialogOpen(false)
				setErrorMessage(undefined)
			}}
			onDelete={handleCityDelete}
			isLoading={isLoading}
			errorMessage={errorMessage}
		/>
	)
}
