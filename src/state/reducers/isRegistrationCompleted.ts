import { IRegistrationCompleted } from '../../types';

const initialState: IRegistrationCompleted = {
  isOpened: false,
};

export const isRegistrationCompletedReducer = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case 'REGISTRATION_COMPLETED':
      return { ...state, isOpened: action.payload };
    default:
      return state;
  }
};
