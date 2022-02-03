import { SHOW_LOADING, HIDE_LOADING } from '../constants/index';
import { loadingTypes } from '../interfaces/loading';
import { Dispatch } from 'redux';
// import { Dispatch } from "react";

export const loadingData = (type: any, data = {}): loadingTypes => {
  return {
    type: type,
    payload: data,
  };
};

export const showLoading: any = (data: {}) => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: SHOW_LOADING,
      payload: {
        loading: true,
      },
    });
  };
};
export const hideLoading: any = (data: {}) => {
  return (dispatch: Dispatch<loadingTypes>) => {
    dispatch(loadingData(HIDE_LOADING, false));
  };
};
