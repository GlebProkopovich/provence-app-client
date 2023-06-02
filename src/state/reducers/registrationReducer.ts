import { IAuthUser } from '../../types';

const initialState: IAuthUser = {
  userInfo: {
    email: null,
    isActivated: false,
    id: null,
  },
  error: null,
};

const registrationReducer = (state = initialState, action: any) => {
  switch (action.type) {
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

export default registrationReducer;
