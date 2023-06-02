const initialState = {
  value: '',
};

export const searchReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SEARCH_VALUE':
      return {
        ...state,
        value: action.payload,
      };
    case 'SEARCH_CLEAR':
      return {
        ...state,
        value: '',
      };
    default:
      return state;
  }
};
