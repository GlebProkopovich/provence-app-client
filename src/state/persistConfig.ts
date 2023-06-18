import storage from 'redux-persist/lib/storage';

export const persistConfig = {
  key: 'cart',
  storage,
  whitelist: ['cart'],
};
