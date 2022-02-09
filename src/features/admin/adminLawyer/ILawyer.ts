import { ICity } from "../../city/ICity"

export interface ILawyer {
	id: number
	name: string
	address: string
	description?: string
	isVerified: boolean
	isSuspended: boolean
	isAvailable: boolean
	averageRating: number
	cityId: number
	city: ICity
	phone: string
	ratingPoints: number
	createdAt: number
	updatedAt: number
	userId: number
}
