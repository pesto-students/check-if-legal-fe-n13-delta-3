import { Box } from "@chakra-ui/react"
import { FC, useEffect } from "react"
import { SidebarLayout } from "../../../components/sidebar/SidebarLayout"
import { CenteredSpinner } from "../../../components/ui/CenterSpinner"
import { AuthRole } from "../../../utils/enums"
import { useFetchCities } from "../../city/useFetchCities"
import { useAdminAuth } from "../useAdminAuth"
import { CityListView } from "./CityListView"

export const AdminCity: FC = () => {
	useAdminAuth()
	const { cities, isLoading, fetchCities } = useFetchCities()

	useEffect(() => {
		fetchCities()
	}, [fetchCities])

	return (
		<SidebarLayout role={AuthRole.ADMIN} headingText="Cities" p={2}>
			<Box my={4}>
				{isLoading && <CenteredSpinner />}
				{cities && <CityListView cities={cities} />}
			</Box>
		</SidebarLayout>
	)
}
