import { isLoginOpenedReducer } from './isLoginOpened';
import { combineReducers } from 'redux';
import { isRegistrationOpenedReducer } from './isRegistrationOpened';
import { loginReducer } from './loginReducer';
import registrationReducer from './registrationReducer';
import { getDishesReducer } from './getDishesReducer';
import { searchReducer } from './searchReducer';
import { cartReducer } from './cartReducer';
import { getAllDishesReducer } from './getAllDishesReducer';
import { isSuccessfullWindowReducer } from './isSuccessfullWindowOpened';
import { isErrorWindowOpenedReducer } from './isErrorWindowOpened';
import { isRegistrationCompletedReducer } from './isRegistrationCompleted';
import { isLoadingOpenedReducer } from './isLoadingReducer';
import { authReducer } from './authReducer';
import { isLoadedAllDishesReducer } from './isLoadedAllDishesReducer';

export const reducers = combineReducers({
  loginForm: isLoginOpenedReducer,
  registrationForm: isRegistrationOpenedReducer,
  successfullWindow: isSuccessfullWindowReducer,
  errorWindow: isErrorWindowOpenedReducer,
  loginUser: loginReducer,
  registrationUser: registrationReducer,
  dishesData: getDishesReducer,
  search: searchReducer,
  cart: cartReducer,
  allDishes: getAllDishesReducer,
  registrationCompletedWindow: isRegistrationCompletedReducer,
  loading: isLoadingOpenedReducer,
  authUser: authReducer,
  allDishesLoader: isLoadedAllDishesReducer,
});
