import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const reviewApi = createApi({
    reducerPath:"reviewApi",
    baseQuery:fetchBaseQuery({baseUrl:"https://e-commerce-arbd.onrender.com/api/"}),
    tagTypes:["review"],
    endpoints:(builder)=>({
        addReview:builder.mutation({
            query:(data)=>({
                method:"POST",
                url:"review/add-review",
                body:data
            }),
            invalidatesTags:["review"]
        }),

        getReview:builder.query({
            query:(data)=>({
                method:"GET",
                url:"review/get-review",
                body:data
            }),
            providesTags:["review"]
        }),

        singleReview:builder.query({
            query:(id)=>({
                method:"GET",
                url:`review/single-review/${id}`,
            }),
            providesTags:["review"]
        }),

   

    })
})


export const { useAddReviewMutation,useGetReviewQuery,useSingleReviewQuery } = reviewApi;