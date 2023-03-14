import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://e-commerce-arbd.onrender.com/api/",
  prepareHeaders: (headers, { getState }) => {
    const userToken = getState();
    const token = userToken?.auth?.userToken;

    headers.set("authorization", token ? `Beater ${token}` : "");
    return headers;
  },
 }),
  tagTypes:["order"],
  endpoints: (builder) => ({
    getOrder: builder.query({
      query: (page) => ({
        method: "GET",
        url: `order/all-order?page=${page}`,
      }),
      providesTags:["order"]
    }),

    getSingleOrder: builder.query({
      query: (id) => ({
        method: "GET",
        url: `order/single-order/${id}`,
      }),
      providesTags:["order"]
    }),

    updateDelevert: builder.mutation({
      query: (id) => ({
        method: "PUT",
        url: `order/order-delevert/${id}`,
      }),
      invalidatesTags:["order"]
    }),

    updateStatus: builder.mutation({
      query: (id) => ({
        method: "PUT",
        url: `order/order-status/${id}`,
      }),
      invalidatesTags:["order"]
    }),

   userOrder: builder.query({
      query: (id) => ({
        method: "GET",
        url: `order/user-order/${id}`,
      }),
      providesTags:["order"]
    }),

  }),
});

export const {useGetOrderQuery,useUpdateDelevertMutation,useGetSingleOrderQuery,useUpdateStatusMutation,useUserOrderQuery} = orderApi;
