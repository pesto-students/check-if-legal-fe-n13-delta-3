import { IState } from "../state/IState"

export interface ICity {
	id: number
	name: string
	stateId: number
	state: IState
}
