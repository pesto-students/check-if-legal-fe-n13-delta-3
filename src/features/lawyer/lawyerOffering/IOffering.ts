import { ILanguage } from "../../shared/language/ILanguage"
import { IPaperType } from "../../shared/paperType/IPaperType"

export interface IOffering {
	id: number
	createdAt: Date
	updatedAt: Date
	lawyerId: number
	paperTypeId: number
	paperType: IPaperType
	languageId: number
	language: ILanguage
	price: number
	expectedTimeInHours: number
	isAvailable: boolean
	description: string | null
}
