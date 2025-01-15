import { configureStore } from '@reduxjs/toolkit'
import quotesReducer from './quotesSlice'

export const store = configureStore({
  reducer: {
    [quotesSlice.reducerPath]: quotesSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(quotesSlice.middleware),
});

export default store;
