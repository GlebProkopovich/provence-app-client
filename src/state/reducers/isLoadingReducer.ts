import { ILoading } from '../../types';

const initialState: ILoading = {
  isOpened: false,
};

export const isLoadingOpenedReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'LOADING_OPENED':
      return { ...state, isOpened: action.payload };
    default:
      return state;
  }
};
