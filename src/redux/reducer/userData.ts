import { SET_USER_DATA, CLEAR_USER_DATA } from '../constants/index';

const userState: any = {
  userData: {},
};
export const userDataReducer = (state = userState, action: any) => {
  switch (action.type) {
    case SET_USER_DATA:
      return { ...state, ...action.payload };
    case CLEAR_USER_DATA:
      return state;
    default:
      return state;
  }
};
