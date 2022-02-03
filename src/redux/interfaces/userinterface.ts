import { SET_USER_DATA, CLEAR_USER_DATA } from '../constants';

interface userState {
  type: typeof SET_USER_DATA | typeof CLEAR_USER_DATA;
  payload: {};
}

export type userTypes = userState;
