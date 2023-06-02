import { ILoginOpened } from '../../types';

const initialState: ILoginOpened = {
  isOpened: false,
};

export const isLoginOpenedReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'IS_LOGIN_OPENED':
      return { ...state, isOpened: !state.isOpened };
    default:
      return state;
  }
};
