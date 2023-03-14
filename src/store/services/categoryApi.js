import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://e-commerce-arbd.onrender.com/api/",
    prepareHeaders: (headers, { getState }) => {
      const userToken = getState();
      const token = userToken?.auth?.adminToken;
      console.log("token",token)

      headers.set("authorization", token ? `Beater ${token}` : "");
      return headers;
    },
  }),
  tagTypes: ["category"],

  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (name) => ({
        method: "POST",
        url: "category/create-category",
        body: name,
      }),
      invalidatesTags: ["category"],
    }),

    getCategory: builder.query({
      query: (page) => ({
        method: "GET",
        url: `category/get-category?page=${page}`,
      }),
      providesTags: ["category"],
    }),

    getAllCategory: builder.query({
      query: () => ({
        method: "GET",
        url: `category/all-category`,
      }),
      providesTags: ["category"],
    }),

    getSingleCategory: builder.query({
      query: (id) => ({
        method: "GET",
        url: `category/single-category/${id}`,
      }),
      providesTags: ["category"],
    }),

    randomCategory: builder.query({
      query: () => ({
        method: "GET",
        url: `category/rendom-category`,
      }),
      providesTags: ["category"],
    }),

    updateCategory: builder.mutation({
      query: ({updateName, id}) => ({
        method: "PUT",
        url: `category/update-category/${id}`,
        body: updateName,
      }),
      invalidatesTags: ["category"],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `category/delete-category/${id}`,
      }),
      invalidatesTags: ["category"],
    }),


  }),
});

export const {
  useCreateCategoryMutation,
  useGetCategoryQuery,
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoryQuery,
  useRandomCategoryQuery
} = categoryApi;
