import { FC } from "react"
import { useRoutes } from "react-router-dom"
import { publicRoutes } from "./publicRoutes"

export const AppRoutes: FC = () => {
	const routes = publicRoutes
	return useRoutes(routes)
}
