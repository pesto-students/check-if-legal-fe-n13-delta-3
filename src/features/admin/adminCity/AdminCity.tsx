import { Box, Button, useDisclosure } from "@chakra-ui/react"
import { FC, useCallback, useEffect } from "react"
import { SidebarLayout } from "../../../components/sidebar/SidebarLayout"
import { CenteredSpinner } from "../../../components/ui/CenterSpinner"
import { AuthRole } from "../../../utils/enums"
import { useFetchCities } from "../../city/useFetchCities"
import { useFetchStates } from "../../state/useFetchStates"
import { useAdminAuth } from "../useAdminAuth"
import { CityAddDrawer } from "./cityAdd/CityAddDrawer"
import { CityListView } from "./CityListView"

export const AdminCity: FC = () => {
	useAdminAuth()
	const { states, fetchStates } = useFetchStates()
	const { cities, isLoading, fetchCities } = useFetchCities()
	const cityAddDrawerDisclosure = useDisclosure()

	useEffect(() => {
		fetchStates()
		fetchCities()
	}, [fetchStates, fetchCities])

	const onCityAddSuccess = useCallback(() => {
		fetchCities()
	}, [fetchCities])

	return (
		<SidebarLayout role={AuthRole.ADMIN} headingText="Cities" p={2}>
			<Box my={4}>
				<Box my={4}>
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
				{cities && <CityListView cities={cities} />}
			</Box>

			{/* Drawers */}
			{states && (
				<CityAddDrawer
					states={states}
					onSuccess={onCityAddSuccess}
					{...cityAddDrawerDisclosure}
				/>
			)}
		</SidebarLayout>
	)
}
