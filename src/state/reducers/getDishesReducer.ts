import { IDishAllInfo } from '../../types';

const initialState: IDishAllInfo = {
  dishesAllInfo: {
    dishes: [],
    error: false,
    limit: 1,
    page: 1,
    total: 1,
  },
};

export const getDishesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'GETDISHES_SUCCESS':
      return {
        ...state,
        dishesAllInfo: action.payload,
      };
    case 'GETDISHES_ERROR':
      return {
        ...state,
        dishesAllInfo: {
          ...state.dishesAllInfo,
          error: action.payload,
        },
      };
    default:
      return state;
  }
};
