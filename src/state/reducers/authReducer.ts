import { IAuthUser } from '../../types';

const initialState: IAuthUser = {
  isAuth: false,
};

export const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'AUTH_USER':
      return {
        ...state,
        isAuth: action.payload,
        error: null,
      };
    default:
      return state;
  }
};
