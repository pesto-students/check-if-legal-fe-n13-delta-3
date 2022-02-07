import { RouteObject } from "react-router-dom"
import { AdminLogin } from "./adminLogin/AdminLogin"
import { UserLogin } from "./userLogin/UserLogin"

export const loginRoutes: RouteObject[] = [
	{ index: true, element: <UserLogin /> },
	{ path: "admin", element: <AdminLogin /> },
]
