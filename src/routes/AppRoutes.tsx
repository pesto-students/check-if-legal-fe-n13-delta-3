import { FC } from "react"
import { useRoutes } from "react-router-dom"
import { publicRoutes } from "./public.routes"

export const AppRoutes: FC = () => {
	const routes = publicRoutes
	return useRoutes(routes)
}
