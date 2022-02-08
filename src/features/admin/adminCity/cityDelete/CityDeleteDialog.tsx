import { FC, useState } from "react"
import DeleteItemDialog from "../../../../components/ui/DeleteItemDialog"
import { getErrorMessage } from "../../../../utils/helpers"
import { ICity } from "../../../city/ICity"
import { useAdminAuth } from "../../useAdminAuth"
import { cityDeleteApi } from "./cityDeleteApi"

type IProps = {
	city: ICity
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
	onSuccess?: () => void
}

export const CityDeleteDialog: FC<IProps> = ({ city, isOpen, setIsOpen, onSuccess }) => {
	const { token } = useAdminAuth()
	const [isLoading, setIsLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState<string>()

	const handleCityDelete = async () => {
		try {
			setIsLoading(true)
			await cityDeleteApi({ id: city.id }, token)
			setIsOpen(false)
			onSuccess && onSuccess()
		} catch (err) {
			console.log(err)
			setErrorMessage(getErrorMessage(err))
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<DeleteItemDialog
			title={`Delete City: ${city.name}`}
			isOpen={isOpen}
			onCancel={() => {
				setIsOpen(false)
				setErrorMessage(undefined)
			}}
			onDelete={handleCityDelete}
			isLoading={isLoading}
			errorMessage={errorMessage}
		/>
	)
}
