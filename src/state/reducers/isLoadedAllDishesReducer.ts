import { ILoading } from '../../types';

const initialState: ILoading = {
  isOpened: false,
};

export const isLoadedAllDishesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'ALLDISHES_LOADED':
      return {
        ...state,
        isOpened: action.payload,
      };
    default:
      return state;
  }
};
