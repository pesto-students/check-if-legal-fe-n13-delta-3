import { RouteObject } from "react-router-dom"
import { AdminDashboard } from "./adminDashboard/AdminDashboard"

export const adminRoutes: RouteObject[] = [{ index: true, element: <AdminDashboard /> }]
