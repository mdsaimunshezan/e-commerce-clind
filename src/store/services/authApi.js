import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath:"authApi",
    baseQuery:fetchBaseQuery({baseUrl:"https://e-commerce-arbd.onrender.com/api/"}),
    endpoints:(builder)=>({
        adminLogin:builder.mutation({
            query:(loginData)=>({
                method:"POST",
                url:"user/login",
                body:loginData
            })
        }),

        userReguster:builder.mutation({
            query:(user)=>({
                method:"POST",
                url:"user/reguster",
                body:user
            })
        }),

        userLogin:builder.mutation({
            query:(user)=>({
                method:"POST",
                url:"user/login",
                body:user
            })
        }),

        getCustomer:builder.query({
            query:(user)=>({
                method:"GET",
                url:"user/get-customer",
                body:user
            })
        }),


    })
})


export const { useAdminLoginMutation,useUserRegusterMutation,useUserLoginMutation,useGetCustomerQuery } = authApi;