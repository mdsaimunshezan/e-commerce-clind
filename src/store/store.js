import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authReducer";
import cartReducer from "./features/cartReducer";
import { authApi } from "./services/authApi";
import { categoryApi } from "./services/categoryApi";
import { homeApi } from "./services/homeApi";
import { orderApi } from "./services/orderApi";
import { paymentApi } from "./services/paymentApi";
import { prodectApi } from "./services/prodectApi";
import { reviewApi } from "./services/reviewApi";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [prodectApi.reducerPath]: prodectApi.reducer,
    [homeApi.reducerPath]: homeApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    auth: authReducer,
    cart: cartReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      categoryApi.middleware,
      prodectApi.middleware,
      homeApi.middleware,
      paymentApi.middleware,
      orderApi.middleware,
      reviewApi.middleware,
    ]),
});

export default store;
