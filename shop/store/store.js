import { configureStore } from '@reduxjs/toolkit';
import productsSlice from './slices/productsSlice';
import cartSlice from './slices/cartSlice';

const store = configureStore({
  reducer: {
    products: productsSlice,
    cart: cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export default store;
