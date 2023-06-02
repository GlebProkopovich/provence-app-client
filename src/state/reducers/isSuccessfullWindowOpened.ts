import { ISuccessfullWindowOpened } from '../../types';

const initialState: ISuccessfullWindowOpened = {
  isOpened: false,
};

export const isSuccessfullWindowReducer = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case 'SUCCESS_WINDOW_OPENED':
      return { ...state, isOpened: action.payload };
    default:
      return state;
  }
};
