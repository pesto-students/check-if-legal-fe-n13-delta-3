import { HIDE_LOADING, SHOW_LOADING } from '../constants';

interface loadingState {
  type: typeof SHOW_LOADING | typeof HIDE_LOADING;
  payload: {};
}

export type loadingTypes = loadingState;
