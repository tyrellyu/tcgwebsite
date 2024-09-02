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
    amount:                 number
    date:                   string
  }

export interface DashboardMetrics {
    popularCards: Cards[];
    soldCardSummary: SoldCardSummary[];
    boughtCardSummary: BoughtCardSummary[];
    collectionSummary: CollectionSummary[];
    collectionByCategory: CollectionByCategory[];

    

}

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    reducerPath: "api",
    tagTypes: ["DashboardMetrics"],
    endpoints: (build) => ({
        getDashboardMetrics: build.query<DashboardMetrics, void>({
        query: () => "/dashboard",
        providesTags: ["DashboardMetrics"]

    }),
   }),
});

export const {
    
    useGetDashboardMetricsQuery,

} = api;