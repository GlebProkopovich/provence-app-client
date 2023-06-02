import { IRegistrationOpened } from '../../types';

const initialState: IRegistrationOpened = {
  isOpened: false,
};

export const isRegistrationOpenedReducer = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case 'IS_REGISTRATION_OPENED':
      return { ...state, isOpened: !state.isOpened };
    default:
      return state;
  }
};
