import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://e-commerce-arbd.onrender.com/api/",
    prepareHeaders: (headers, { getState }) => {
      const userToken = getState();
      const token = userToken?.auth?.userToken;

      headers.set("authorization", token ? `Beater ${token}` : "");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    payment: builder.mutation({
      query: (cart) => ({
        method: "POST",
        url: "prament/create-checkout-session",
        body: cart,
      }),
    }),

    varifayPayment: builder.query({
      query: (id) => ({
        method: "GET",
        url: `prament/varify-payment/${id}`,
      }),
    }),
  }),
});

export const { usePaymentMutation, useVarifayPaymentQuery } = paymentApi;
