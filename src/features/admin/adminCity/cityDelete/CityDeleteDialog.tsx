import { FC, useState } from "react"
import DeleteItemDialog from "../../../../components/ui/DeleteItemDialog"
import { getErrorMessage } from "../../../../utils/helpers"
import { useAdminAuth } from "../../useAdminAuth"
import { useCityDeleteStore } from "./useCityDeleteStore"
import { useCityStore } from "../../../city/useCityStore"
import { cityDeleteApi } from "./cityDeleteApi"

export const CityDeleteDialog: FC = () => {
	const { token } = useAdminAuth()

	const fetchCities = useCityStore((state) => state.fetchCities)
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
				fetchCities()
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
