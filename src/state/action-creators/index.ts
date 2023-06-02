import axios from 'axios';
import AuthService from '../../services/authService';
import { AuthResponse, IAllIdDishes, IDishCart } from '../../types';

const API_URL = 'http://localhost:5000/api';

export const setLoginOpened = () => ({
  type: 'IS_LOGIN_OPENED',
});

export const setSuccessfullWindowOpened = (value: boolean) => ({
  type: 'SUCCESS_WINDOW_OPENED',
  payload: value,
});

export const setLoadingOpened = (value: boolean) => ({
  type: 'LOADING_OPENED',
  payload: value,
});

export const setAllDishesLoadingChanged = (value: boolean) => ({
  type: 'ALLDISHES_LOADED',
  payload: value,
});

export const setRegistrationWindowCompleted = (value: boolean) => ({
  type: 'REGISTRATION_COMPLETED',
  payload: value,
});

export const setErrorWindowOpened = (value: boolean) => ({
  type: 'ERROR_WINDOW_OPENED',
  payload: value,
});

export const setRegistrationOpened = () => ({
  type: 'IS_REGISTRATION_OPENED',
});

export const setAuthUser = (value: boolean) => ({
  type: 'AUTH_USER',
  payload: value,
});

export const loginUser = (email: string, password: string): any => {
  return async (dispatch: any) => {
    try {
      dispatch(setLoadingOpened(true));
      const response = await AuthService.login(email, password);
      dispatch(setLoadingOpened(false));
      dispatch(setLoginOpened());
      dispatch(setAuthUser(true));
      localStorage.setItem('token', response.data.accessToken);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response.data,
      });
    } catch (error: any) {
      dispatch(setLoadingOpened(false));
      dispatch({
        type: 'LOGIN_ERROR',
        payload: error.response.data.message,
      });
    }
  };
};

export const refresh = (): any => {
  return async (dispatch: any) => {
    try {
      dispatch(setLoadingOpened(true));
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      dispatch(setLoadingOpened(false));
      localStorage.setItem('token', response.data.accessToken);
      dispatch(setAuthUser(true));
      dispatch({
        type: 'REFRESH_SUCCESS',
        payload: response.data,
      });
    } catch (error) {
      dispatch(setLoadingOpened(false));
      console.log(error);
    }
  };
};

export const registrationUser = (
  name: string,
  number: string,
  email: string,
  password: string
): any => {
  return async (dispatch: any) => {
    try {
      dispatch(setLoadingOpened(true));
      const response = await AuthService.registration(
        name,
        number,
        email,
        password
      );
      dispatch(setLoadingOpened(false));
      dispatch(setAuthUser(true));
      localStorage.setItem('token', response.data.accessToken);
      dispatch(setRegistrationOpened());
      dispatch(setRegistrationWindowCompleted(true));
      dispatch({
        type: 'REGISTRATION_SUCCESS',
        payload: response.data,
      });
    } catch (error: any) {
      dispatch(setLoadingOpened(false));
      dispatch({
        type: 'REGISTRATION_ERROR',
        payload: error.response.data.message,
      });
    }
  };
};

export const logoutUser = (): any => {
  return async (dispatch: any) => {
    try {
      dispatch(setLoadingOpened(true));
      await AuthService.logout();
      dispatch(setLoadingOpened(false));
      dispatch(setAuthUser(false));
      localStorage.removeItem('token');
    } catch (error: any) {
      dispatch(setLoadingOpened(false));
      console.log(error);
    }
  };
};

export const getDishes = (
  dishUrl: string,
  page: number,
  searchValue: string
): any => {
  return async (dispatch: any) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/${dishUrl}?page=${page}&search=${searchValue}`
      );
      const dishes = response.data[dishUrl];
      const responseAllInfo = {
        dishes,
        error: response.data.error,
        limit: response.data.limit,
        page: response.data.page,
        total: response.data.total,
      };
      dispatch({
        type: 'GETDISHES_SUCCESS',
        payload: responseAllInfo,
      });
    } catch (error: any) {
      dispatch({
        type: 'GETDISHES_ERROR',
        payload: error.message,
      });
    }
  };
};

export const getValueSearchInput = (e: string) => ({
  type: 'SEARCH_VALUE',
  payload: e,
});

export const clearSearchInput = () => ({
  type: 'SEARCH_CLEAR',
});

export const getDefaultCart = (): any => {
  return async (dispatch: any) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/alldishes`);
      console.log(response);
      const alldishes: IDishCart[] = response.data.alldishes;
      const allIdDishes: IAllIdDishes = {};
      alldishes.forEach((el) => {
        allIdDishes[el.id] = 0;
      });
      dispatch({
        type: 'GET_DEFAULT_CART',
        payload: allIdDishes,
      });
    } catch (error: any) {
      dispatch({
        type: 'GET_CART_ERROR',
        payload: error.message,
      });
    }
  };
};

export const getAllDishes = (): any => {
  return async (dispatch: any) => {
    try {
      dispatch(setAllDishesLoadingChanged(true));
      const response = (await axios.get(`http://localhost:5000/api/alldishes`))
        .data.alldishes;
      dispatch(setAllDishesLoadingChanged(false));
      dispatch({
        type: 'GET_ALL_DISHES',
        payload: response,
      });
    } catch (error: any) {
      dispatch(setAllDishesLoadingChanged(false));
      dispatch({
        type: 'GET_DISHES_ERROR',
        payload: error.message,
      });
    }
  };
};

export const addToCart = (dishId: string | undefined) => {
  return {
    type: 'ADD_TO_CART',
    payload: dishId,
  };
};

export const deleteFromCart = (dishId: string | undefined) => {
  return {
    type: 'DELETE_FROM_CART',
    payload: dishId,
  };
};
