import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom"
import { AdminDashboard } from "./features/admin/adminDashboard/AdminDashboard"
import { Landing } from "./features/landing/Landing"
import { AdminLogin } from "./features/login/adminLogin/AdminLogin"
import { UserLogin } from "./features/login/userLogin/UserLogin"
import { AuthRole } from "./utils/enums"
import { storage } from "./utils/storage"

function AdminOutlet() {
	const authPayload = storage.getAuth()
	if (authPayload && authPayload.role === AuthRole.ADMIN) {
		return <Outlet />
	}
	return <Navigate to="admin/login" />
}

export function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Landing />} />
				<Route path="login" element={<Outlet />}>
					<Route index element={<UserLogin />} />
					<Route path="admin" element={<AdminLogin />} />
				</Route>
				<Route path="admin" element={<AdminOutlet />}>
					<Route index element={<AdminDashboard />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
