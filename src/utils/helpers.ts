import { ICity } from "../features/shared/city/ICity"
import { ReviewStatus } from "../features/shared/review/IReview"

export function getErrorMessage(err: unknown) {
	if (err instanceof Error) return err.message
	return "Unknown Error"
}

export function normalizeDate(date: string | number) {
	const d = new Date(date)
	return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`
}

export function normalizeDateTime(date: string | number) {
	const d = new Date(date)
	return `${d.getDate()}-${
		d.getMonth() + 1
	}-${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`
}

export function cityLabel(city: ICity) {
	return `${city.name}, ${city.state.name}`
}

/**
 * get INR format with separators
 */
export function formatInr(amount: number) {
	return amount.toLocaleString("en-IN", {
		maximumFractionDigits: 2,
		signDisplay: "never",
		currency: "INR",
	})
}

export function getReviewStatusText(status: ReviewStatus) {
	if (status === ReviewStatus.INITIAL) return "Initiated"
	else if (status === ReviewStatus.WAITING_FOR_PAYMENT) return "Ready for Payment"
	else if (status === ReviewStatus.PENDING_FOR_REVIEW) return "In Review"
	else if (status === ReviewStatus.CLOSED) return "Completed"
	else throw new Error("Unknown Review Status")
}
