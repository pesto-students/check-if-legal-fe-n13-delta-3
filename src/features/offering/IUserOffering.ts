import { ILawyer } from "../lawyer/ILawyer"
import { ILanguage } from "../shared/language/ILanguage"
import { IPaperType } from "../shared/paperType/IPaperType"

export interface IUserOffering {
	id: number
	lawyerId: number
	lawyer: ILawyer
	paperTypeId: number
	paperType: IPaperType
	languageId: number
	language: ILanguage
	price?: number
	expectedTimeInHours: number
	description: string | null
}
