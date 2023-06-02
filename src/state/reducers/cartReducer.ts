import { ICart } from '../../types';

const initialState: ICart = {
  dishes: {},
  error: null,
};

export const cartReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'GET_DEFAULT_CART':
      return {
        ...state,
        dishes: action.payload,
      };
    case 'GET_CART_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'ADD_TO_CART':
      return {
        ...state,
        dishes: {
          ...state.dishes,
          [action.payload]: state.dishes[action.payload] + 1,
        },
      };
    case 'DELETE_FROM_CART':
      return {
        ...state,
        dishes: {
          ...state.dishes,
          [action.payload]: state.dishes[action.payload] - 1,
        },
      };
    default:
      return state;
  }
};
