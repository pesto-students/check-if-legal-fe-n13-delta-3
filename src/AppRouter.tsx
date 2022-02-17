import { FC } from "react"
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom"
import { AdminCity } from "./features/admin/adminCity/AdminCity"
import { AdminDashboard } from "./features/admin/adminDashboard/AdminDashboard"
import { AdminLanguage } from "./features/admin/adminLanguage/AdminLanguage"
import { AdminLawyer } from "./features/admin/adminLawyer/AdminLawyer"
import { AdminPaperType } from "./features/admin/adminPaperType/AdminPaperType"
import { Landing } from "./features/landing/Landing"
import { LawyerBank } from "./features/lawyer/lawyerBank/LawyerBank"
import { LawyerDashboard } from "./features/lawyer/lawyerDashboard/LawyerDashboard"
import { LawyerOffering } from "./features/lawyer/lawyerOffering/LawyerOffering"
import { LawyerRegister } from "./features/lawyer/lawyerRegister/LawyerRegister"
import { LawyerReview } from "./features/lawyer/lawyerReview/LawyerReview"
import { LawyerStatus } from "./features/lawyer/lawyerStatus/LawyerStatus"
import { AdminLogin } from "./features/login/adminLogin/AdminLogin"
import { UserLogin } from "./features/login/userLogin/UserLogin"
import { Logout } from "./features/logout/Logout"
import { Offering } from "./features/offering/Offering"
import { UserReview } from "./features/user/userReview/UserReview"
import { UserReviewDetails } from "./features/user/userReviewDetails/UserReviewDetails"
import { AuthRole } from "./utils/enums"
import { storage } from "./utils/storage"

export function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Landing />} />
				<Route path="logout" element={<Logout />} />
				<Route path="offering" element={<Offering />} />

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
					<Route index element={<UserReview />} />
					<Route path="review/:id/details" element={<UserReviewDetails />} />
				</Route>

				<Route path="lawyer" element={<PrivateOutlet role={AuthRole.LAWYER} />}>
					<Route index element={<LawyerDashboard />} />
					<Route path="register" element={<LawyerRegister />} />
					<Route path="status" element={<LawyerStatus />} />
					<Route path="offering" element={<LawyerOffering />} />
					<Route path="bank" element={<LawyerBank />} />
					<Route path="review" element={<LawyerReview />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

const PrivateOutlet: FC<{ role: AuthRole }> = ({ role }) => {
	const authPayload = storage.getAuth()
	if (authPayload && authPayload.role === role) return <Outlet />

	if (role === AuthRole.ADMIN) return <Navigate to="admin/login" />
	return <Navigate to="/login" />
}
