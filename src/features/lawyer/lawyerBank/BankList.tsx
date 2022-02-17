import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { FC } from "react"
import { CenteredSpinner } from "../../shared/components/ui/CenterSpinner"
import { DeleteIconButton } from "../../shared/components/ui/DeleteIconButton"
import { useBankDeleteStore } from "./bankDelete/useBankDeleteStore"
import { useLawyerBankStore } from "./useLawyerBankStore"

export const BankList: FC = () => {
	const { banks, isBanksLoading } = useLawyerBankStore()
	const { setSelectedBank: setSelectedBankForDelete, setIsDeleteDialogOpen } =
		useBankDeleteStore()

	if (isBanksLoading || !banks) return <CenteredSpinner />

	return (
		<Table size="sm" fontSize={"lg"}>
			<Thead>
				<Tr>
					<Th>Bank Name</Th>
					<Th>IFSC</Th>
					<Th>Account No</Th>
					<Th isNumeric></Th>
				</Tr>
			</Thead>
			<Tbody>
				{banks.map((bank) => (
					<Tr
						key={bank.id}
						cursor="pointer"
						_hover={{ backgroundColor: "gray.100" }}
					>
						<Td fontWeight={"semibold"}>{bank.bankName}</Td>
						<Td>{bank.bankIfsc}</Td>
						<Td>{bank.accountNumber} </Td>
						<Td isNumeric onClick={(e) => e.stopPropagation()}>
							<DeleteIconButton
								onClick={() => {
									setSelectedBankForDelete(bank)
									setIsDeleteDialogOpen(true)
								}}
							/>
						</Td>
					</Tr>
				))}
			</Tbody>
		</Table>
	)
}
