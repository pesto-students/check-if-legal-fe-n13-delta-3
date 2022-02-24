import { FC } from "react"
import { AuthRole } from "../../../utils/enums"
import { SidebarLayout } from "../../shared/components/sidebarLayout/SidebarLayout"
import { PaymentListView } from "./UserPaymentList"

export const UserPayment: FC = () => {
	return (
		<SidebarLayout role={AuthRole.USER} headingText="Payments">
			<PaymentListView />
		</SidebarLayout>
	)
}
