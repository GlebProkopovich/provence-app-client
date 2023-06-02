import { IAuthUser } from '../../types';

const initialState: IAuthUser = {
  userInfo: {
    email: null,
    isActivated: false,
    id: null,
  },
  error: null,
};

export const loginReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        userInfo: action.payload,
        error: null,
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'REFRESH_SUCCESS':
      return {
        ...state,
        userInfo: action.payload,
        error: null,
      };
    case 'REGISTRATION_SUCCESS':
      return {
        ...state,
        userInfo: action.payload,
        error: null,
      };
    case 'REGISTRATION_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
