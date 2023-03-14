import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const prodectApi = createApi({
  reducerPath: "prodectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://e-commerce-arbd.onrender.com/api/",
    prepareHeaders: (headers, { getState }) => {
      const userToken = getState();
      const token = userToken?.auth?.adminToken;

      headers.set("authorization", token ? `Beater ${token}` : "");
      return headers;
    },
  }),
  tagTypes: ["prodect"],

  endpoints: (builder) => ({
    createProdect: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "prodect/create-prodect",
        body: data,
      }),
      invalidatesTags: ["prodect"],
    }),

    getProdect: builder.query({
      query: (page) => ({
        method: "GET",
        url: `prodect/get-prodect?page=${page}`,
      }),
      providesTags: ["prodect"],
    }),

    singleGetProdect: builder.query({
      query: (id) => ({
        method: "GET",
        url: `prodect/single-prodect/${id}`,
      }),
      providesTags: ["prodect"],
    }),

    deleteProdect: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `prodect/delete-prodect/${id}`,
      }),
      invalidatesTags: ["prodect"],
    }),

    updateProdect: builder.mutation({
      query: ({ id,formData }) => ({
        method: "PUT",
        url: `prodect/update-prodect/${id}`,
        body: formData,
      }),
      invalidatesTags: ["prodect"],
    }),
    
  }),
});

export const {
  useCreateProdectMutation,
  useGetProdectQuery,
  useSingleGetProdectQuery,
  useDeleteProdectMutation,
  useUpdateProdectMutation
} = prodectApi;
