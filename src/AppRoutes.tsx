import { FC } from "react"
import { RouteObject, useRoutes } from "react-router-dom"
import { adminRoutes } from "./features/admin/admin.routes"
import { Landing } from "./features/landing/Landing"
import { loginRoutes } from "./features/login/login.routes"
import { AuthRole } from "./utils/enums"
import { storage } from "./utils/storage"

export const AppRoutes: FC = () => {
	let routes: RouteObject[] = [
		{ index: true, element: <Landing /> },
		{ path: "login", children: loginRoutes },
	]

	const authPayload = storage.getAuth()
	if (authPayload) {
		if (authPayload.role === AuthRole.ADMIN) {
			routes.push({ path: "admin", children: adminRoutes })
		}
	}

	return useRoutes(routes)
}
