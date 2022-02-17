export interface IReviewPayment {
	id: number
	createdAt: string
	updatedAt: string
	reviewId: number
	orderId: string
	amountInPaisa: number
	status: ReviewPaymentStatus
}

export enum ReviewPaymentStatus {
	CREATED = "CREATED",
	ATTEMPTED = "ATTEMPTED",
	PAID = "PAID",
}
