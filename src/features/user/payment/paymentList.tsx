import { FC } from "react"
import { AuthRole } from "../../../utils/enums"
import { SidebarLayout } from "../../shared/components/sidebarLayout/SidebarLayout"
import { PaymentListView } from "./payment"

export const PaymentsListGeneric: FC = () => {
	return (
		<SidebarLayout role={AuthRole.USER} headingText="Payment Details" p={4}>
			<PaymentListView />
		</SidebarLayout>
	)
}
