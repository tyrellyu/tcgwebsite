import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Cards {
    cardId:      string;    
    name:        string;
    num:         string;
    set:         string;
    price:       number;
    rarity:      string;
    quantity:    number;
  }

  export interface NewCard {
    name:        string;
    num:         string;
    set:         string;
    price:       number;
    rarity:      string;
    quantity:    number;
  }

  export interface SoldCardSummary {
    soldCardSummaryId:  string  
    totalValue:         number
    changePercentage?:    number
    date:               string
  }

  export interface BoughtCardSummary {
    boughtCardSummaryId: string
    totalPurchased:      number
    changePercentage?:    number
    date:                string
  }

  export interface CollectionSummary {
    collectionSummaryId: string 
    totalExpenses:       number
    date:                string
  }

  export interface CollectionByCategory {
    collectionByCategoryId: string        
    collectionSummaryId:    string
    category:               string
    amount:                 string
    date:                   string
  }

export interface DashboardMetrics {
    popularCards: Cards[];
    soldCardSummary: SoldCardSummary[];
    boughtCardSummary: BoughtCardSummary[];
    collectionSummary: CollectionSummary[];
    collectionByCategory: CollectionByCategory[];
}

export interface User {
  userId: string;
  name: string;
  email: string;
}

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    reducerPath: "api",
    tagTypes: ["DashboardMetrics", "Cards", "Users", "Portfolio"],
    endpoints: (build) => ({
        getDashboardMetrics: build.query<DashboardMetrics, void>({
        query: () => "/dashboard",
        providesTags: ["DashboardMetrics"]
    }),
    getCards: build.query<Cards[], string | void>({
      query: (search) => ({
        url: "/cards",
        params: search ? {search} : {},
      }),
      providesTags: ["Cards"]
  }),
    createCard: build.mutation<Cards, NewCard>({
      query: (newCard) => ({
        url: "/cards",
        method: "POST",
        body: newCard
      }),
      invalidatesTags: ["Cards"]
    }),
  
   getUsers: build.query<User[], void>({
    query: () => "/users",
    providesTags: ["Users"],
  }),
  getPortfolioByCategory: build.query<CollectionByCategory[], void>({
    query: () => "/portfolio",
    providesTags: ["Portfolio"],
  }),
}),
});

export const {
    
    useGetDashboardMetricsQuery,
    useGetCardsQuery,
    useCreateCardMutation,
    useGetUsersQuery,
    useGetPortfolioByCategoryQuery,

} = api;