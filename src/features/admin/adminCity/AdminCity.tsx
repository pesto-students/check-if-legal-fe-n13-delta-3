import { Box, Button, useDisclosure } from "@chakra-ui/react"
import { FC, useCallback, useEffect, useRef, useState } from "react"
import { SidebarLayout } from "../../../components/sidebar/SidebarLayout"
import { CenteredSpinner } from "../../../components/ui/CenterSpinner"
import { AuthRole } from "../../../utils/enums"
import { ICity } from "../../city/ICity"
import { useFetchCities } from "../../city/useFetchCities"
import { useFetchStates } from "../../state/useFetchStates"
import { useAdminAuth } from "../useAdminAuth"
import { CityAddDrawer } from "./cityAdd/CityAddDrawer"
import { CityDeleteDialog } from "./cityDelete/CityDeleteDialog"
import { CityListView } from "./CityListView"

export const AdminCity: FC = () => {
	useAdminAuth()
	const { states, fetchStates } = useFetchStates()
	const { cities, isLoading, fetchCities } = useFetchCities()

	const cityAddDrawerDisclosure = useDisclosure()
	const deleteCityRef = useRef<ICity>()
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

	useEffect(() => {
		fetchStates()
		fetchCities()
	}, [fetchStates, fetchCities])

	const handleCityListRefresh = useCallback(() => {
		fetchCities()
	}, [fetchCities])

	return (
		<SidebarLayout role={AuthRole.ADMIN} headingText="Cities">
			<Box>
				<Box m={4}>
					<Button
						size={"sm"}
						colorScheme="blue"
						onClick={() => cityAddDrawerDisclosure.onOpen()}
					>
						Add City
					</Button>
				</Box>

				{/* City List */}
				{isLoading && <CenteredSpinner />}
				{cities && (
					<CityListView
						cities={cities}
						onDelete={(city) => {
							deleteCityRef.current = city
							setIsDeleteDialogOpen(true)
						}}
					/>
				)}
			</Box>

			{/* Drawers */}
			{states && (
				<CityAddDrawer
					states={states}
					onSuccess={handleCityListRefresh}
					{...cityAddDrawerDisclosure}
				/>
			)}

			{deleteCityRef.current && (
				<CityDeleteDialog
					city={deleteCityRef.current}
					isOpen={isDeleteDialogOpen}
					setIsOpen={setIsDeleteDialogOpen}
					onSuccess={handleCityListRefresh}
				/>
			)}
		</SidebarLayout>
	)
}
