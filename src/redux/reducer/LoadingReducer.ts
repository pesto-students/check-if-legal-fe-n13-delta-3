import { SHOW_LOADING, HIDE_LOADING } from '../constants';

const loading: any = {
  loading: false,
};
export const loadingReducer = (state = loading, action: any) => {
  console.log('==state', state);
  switch (action.type) {
    case SHOW_LOADING:
      return { ...state, loading: true };
    case HIDE_LOADING:
      return { ...state, loading: false };
    default:
      return state;
  }
};
