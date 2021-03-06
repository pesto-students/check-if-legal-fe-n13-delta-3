import { FC } from "react"
import { HashRouter, Navigate, Outlet, Route, Routes } from "react-router-dom"
import { AdminCity } from "./features/admin/adminCity/AdminCity"
import { AdminLanguage } from "./features/admin/adminLanguage/AdminLanguage"
import { AdminLawyer } from "./features/admin/adminLawyer/AdminLawyer"
import { AdminPaperType } from "./features/admin/adminPaperType/AdminPaperType"
import { NotFound } from "./features/defaults/NotFound"
import { Landing } from "./features/landing/Landing"
import { LawyerOffering } from "./features/lawyer/lawyerOffering/LawyerOffering"
import { LawyerPayout } from "./features/lawyer/lawyerPayout/LawyerPayout"
import { LawyerRating } from "./features/lawyer/lawyerRating/LawyerRating"
import { LawyerRegister } from "./features/lawyer/lawyerRegister/LawyerRegister"
import { LawyerReview } from "./features/lawyer/lawyerReview/LawyerReview"
import { LawyerReviewDetails } from "./features/lawyer/lawyerReviewDetails/LawyerReviewDetails"
import { LawyerStatus } from "./features/lawyer/lawyerStatus/LawyerStatus"
import { AdminLogin } from "./features/login/adminLogin/AdminLogin"
import { UserLogin } from "./features/login/userLogin/UserLogin"
import { Logout } from "./features/logout/Logout"
import { Offering } from "./features/offering/Offering"
import { UserPayment } from "./features/user/userPayment/UserPayment"
import { UserRating } from "./features/user/userRating/UserRating"
import { UserReview } from "./features/user/userReview/UserReview"
import { UserReviewDetails } from "./features/user/userReviewDetails/UserReviewDetails"
import { AuthRole } from "./utils/enums"
import { storage } from "./utils/storage"

export function AppRouter() {
	return (
		<HashRouter>
			<Routes>
				<Route index element={<Landing />} />
				<Route path="logout" element={<Logout />} />
				<Route path="offering" element={<Offering />} />

				<Route path="login" element={<Outlet />}>
					<Route index element={<UserLogin />} />
					<Route path="admin" element={<AdminLogin />} />
				</Route>

				<Route path="admin" element={<PrivateOutlet role={AuthRole.ADMIN} />}>
					<Route index element={<AdminLawyer />} />
					<Route path="city" element={<AdminCity />} />
					<Route path="paperType" element={<AdminPaperType />} />
					<Route path="language" element={<AdminLanguage />} />
				</Route>

				<Route path="user" element={<PrivateOutlet role={AuthRole.USER} />}>
					<Route index element={<UserReview />} />
					<Route path="review/:id/details" element={<UserReviewDetails />} />
					<Route path="payment" element={<UserPayment />} />
					<Route path="rating" element={<UserRating />} />
				</Route>

				<Route path="lawyer" element={<PrivateOutlet role={AuthRole.LAWYER} />}>
					<Route index element={<LawyerReview />} />
					<Route path="register" element={<LawyerRegister />} />
					<Route path="status" element={<LawyerStatus />} />
					<Route path="offering" element={<LawyerOffering />} />
					<Route path="review/:id/details" element={<LawyerReviewDetails />} />
					<Route path="rating" element={<LawyerRating />} />
					<Route path="payout" element={<LawyerPayout />} />
				</Route>

				<Route path="*" element={<NotFound />} />
			</Routes>
		</HashRouter>
	)
}

const PrivateOutlet: FC<{ role: AuthRole }> = ({ role }) => {
	const authPayload = storage.getAuth()
	if (authPayload && authPayload.role === role) return <Outlet />

	if (role === AuthRole.ADMIN) return <Navigate to="admin/login" />
	return <Navigate to="/login" />
}
