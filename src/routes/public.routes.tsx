import { RouteObject } from "react-router-dom"
import { Landing } from "../features/landing/Landing"
import { loginRoutes } from "../features/login/login.routes"

export const publicRoutes: RouteObject[] = [
	{ index: true, element: <Landing /> },
	{ path: "login", children: loginRoutes },
]
