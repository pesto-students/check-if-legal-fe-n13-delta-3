import { FC } from "react"
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom"
import { AdminDashboard } from "./features/admin/adminDashboard/AdminDashboard"
import { Landing } from "./features/landing/Landing"
import { LawyerDashboard } from "./features/lawyer/lawyerDashboard/LawyerDashboard"
import { LawyerRegister } from "./features/lawyer/lawyerRegistration/LawyerRegister"
import { LawyerStatus } from "./features/lawyer/lawyerRegistration/LawyerStatus"
import { AdminLogin } from "./features/login/adminLogin/AdminLogin"
import { UserLogin } from "./features/login/userLogin/UserLogin"
import { Logout } from "./features/logout/Logout"
import { UserDashboard } from "./features/user/userDashboard/UserDashboard"
import { AuthRole } from "./utils/enums"
import { storage } from "./utils/storage"

export function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Landing />} />
				<Route path="logout" element={<Logout />} />

				<Route path="login" element={<Outlet />}>
					<Route index element={<UserLogin />} />
					<Route path="admin" element={<AdminLogin />} />
				</Route>

				<Route path="admin" element={<PrivateOutlet role={AuthRole.ADMIN} />}>
					<Route index element={<AdminDashboard />} />
				</Route>

				<Route path="user" element={<PrivateOutlet role={AuthRole.USER} />}>
					<Route index element={<UserDashboard />} />
				</Route>

				<Route path="lawyer" element={<PrivateOutlet role={AuthRole.LAWYER} />}>
					<Route index element={<LawyerDashboard />} />
					<Route path="register" element={<LawyerRegister />} />
					<Route path="status" element={<LawyerStatus />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

const PrivateOutlet: FC<{ role: AuthRole }> = ({ role }) => {
	const authPayload = storage.getAuth()
	if (authPayload && authPayload.role === role) return <Outlet />

	if (role === AuthRole.ADMIN) return <Navigate to="admin/login" />
	return <Navigate to="login" />
}
