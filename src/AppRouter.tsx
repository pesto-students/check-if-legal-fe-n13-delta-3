import { FC } from "react"
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom"
import { AdminCity } from "./features/admin/adminCity/AdminCity"
import { AdminDashboard } from "./features/admin/adminDashboard/AdminDashboard"
import { AdminLanguage } from "./features/admin/adminLanguage/AdminLanguage"
import { AdminLawyer } from "./features/admin/adminLawyer/AdminLawyer"
import { AdminPaperType } from "./features/admin/adminPaperType/AdminPaperType"
import { Landing } from "./features/landing/Landing"
import { LawyerDashboard } from "./features/lawyer/lawyerDashboard/LawyerDashboard"
import { LawyerRegister } from "./features/lawyer/lawyerRegistration/LawyerRegister"
import { LawyerStatus } from "./features/lawyer/lawyerRegistration/LawyerStatus"
import { AdminLogin } from "./features/login/adminLogin/AdminLogin"
import { UserLogin } from "./features/login/userLogin/UserLogin"
import { Logout } from "./features/logout/Logout"
import { UserDashboard } from "./features/user/userDashboard/UserDashboard"
import { UserReview } from "./features/user/userReview/UserReview"
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
					<Route path="city" element={<AdminCity />} />
					<Route path="paperType" element={<AdminPaperType />} />
					<Route path="language" element={<AdminLanguage />} />
					<Route path="lawyer" element={<AdminLawyer />} />
				</Route>

				<Route path="user" element={<PrivateOutlet role={AuthRole.USER} />}>
					<Route index element={<UserDashboard />} />
					<Route path="review" element={<UserReview />} />
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
