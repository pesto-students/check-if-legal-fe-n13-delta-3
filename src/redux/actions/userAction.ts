import { CLEAR_USER_DATA, SET_USER_DATA } from '../constants/index';
import { Dispatch } from 'redux';
import { userTypes } from '../interfaces/userinterface';
import { Api } from 'services/api';

export const setData = (type: any, data = {}): userTypes => {
  return {
    type: type,
    payload: data,
  };
};

export const setUserData: any = (payload: {}) => {
  return async (dispatch: Dispatch<userTypes>) => {
    try {
      let response: any = await Api.post('/user/googleAuth', payload);
      localStorage.setItem('token', response?.data?.token);
      dispatch(setData(SET_USER_DATA, response?.data));
    } catch (error) {}
  };
};
export const clearUserData: any = (data: {}) => {
  return (dispatch: Dispatch<userTypes>) => {
    dispatch(setData(CLEAR_USER_DATA, data));
  };
};
