import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const homeApi = createApi({
    reducerPath:"homeApi",
    baseQuery:fetchBaseQuery({baseUrl:"https://e-commerce-arbd.onrender.com/api/"}),
    endpoints:(builder)=>({

        homeCategoryProdect:builder.query({
            query:({name,page})=>({
                method:"GET",
                url:`home/category-prodect/${name}/${page}`,
            })
        }),

        
        searchCategoryProdect:builder.query({
            query:({keyword,page})=>({
                method:"GET",
                url:`home/search-prodect/${keyword}/${page}`,
            })
        }),

    })
})


export const { useHomeCategoryProdectQuery,useSearchCategoryProdectQuery } = homeApi;