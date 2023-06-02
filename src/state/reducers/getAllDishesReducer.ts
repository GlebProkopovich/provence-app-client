import { ICart } from '../../types';

const initialState: ICart = {
  dishes: [],
  error: null,
};

export const getAllDishesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'GET_ALL_DISHES':
      return {
        ...state,
        dishes: action.payload,
      };
    case 'GET_DISHES_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
