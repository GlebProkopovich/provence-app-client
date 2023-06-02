import { IErrorWindowOpened } from '../../types';

const initialState: IErrorWindowOpened = {
  isOpened: false,
};

export const isErrorWindowOpenedReducer = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case 'ERROR_WINDOW_OPENED':
      return { ...state, isOpened: action.payload };
    default:
      return state;
  }
};
