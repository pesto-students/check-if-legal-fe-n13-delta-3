import { INTIAL_STATE } from '../constants/index';
const INITIAL_STATE = {
  sessionId: '',
  loggedIn: false,
};
export const intialState = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case INTIAL_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
