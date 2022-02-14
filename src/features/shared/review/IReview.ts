import { ILawyer } from "../../admin/adminLawyer/lawyerList/ILawyer"
import { IPaperType } from "../paperType/IPaperType"
import { IUser } from "../../user/IUser"

export interface IReview {
	id: number
	createdAt: string
	updatedAt: string
	userId: number
	user?: IUser
	lawyerId: number
	lawyer?: ILawyer
	paperTypeId: number
	paperType: IPaperType
	languageId: number
	cityId: number
	userNote: string | null
	price: number
	expectedTimeInHours: number
	status: ReviewStatus
}

export enum ReviewStatus {
	INITIAL = "INITIAL",
	WAITING_FOR_PAYMENT = "WAITING_FOR_PAYMENT",
	PENDING_FOR_REVIEW = "PENDING_FOR_REVIEW",
	IN_REVIEW = "IN_REVIEW",
	CLOSED = "CLOSED",
}
