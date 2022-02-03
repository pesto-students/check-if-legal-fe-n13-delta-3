import { OPEN_MODAL } from '../constants/index';

const modeState: any = {
  modelstate: false,
};
export const modelContext = (state = modeState, action: any) => {
  switch (action.type) {
    case OPEN_MODAL:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
