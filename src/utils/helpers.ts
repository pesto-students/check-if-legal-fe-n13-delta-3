import { ICity } from "../features/shared/city/ICity"

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
	}-${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
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
