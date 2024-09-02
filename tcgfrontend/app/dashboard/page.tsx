"use client"

import {BadgePoundSterlingIcon, ChartLine, TrendingDown, TrendingUp } from "lucide-react"
import BoughtCardSummary from "./BoughtCardSummary"
import CardStat from "./CardStat"
import CollectionSummary from "./CollectionSummary"
import PopularCards from "./PopularCards"
import SoldCardSummary from "./SoldCardSummary"


const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows"> 
    <PopularCards />
    <SoldCardSummary/>
    <BoughtCardSummary/>
    <CollectionSummary/>
    <CardStat 
        title = "TCG Portfolio "
        primaryIcon={<ChartLine className="text-blue-600 w-6 h-6" />}
        dateRange="01 - 31 August 2024"
        details={[
          {
            title: "Portfolio Growth:",
            amount: "£1109.34 ",
            changePercentage: 20,
            IconComponent: TrendingUp,
          },
          {
            title: "Overall Investment:",
            amount: "£2218.69",
            changePercentage: 50,
            IconComponent: TrendingUp,
          }
        ]}
    
    />
        <CardStat 
        title = "Profit & Loss"
        primaryIcon={<BadgePoundSterlingIcon className="text-blue-600 w-6 h-6" />}
        dateRange="01 - 31 August 2024"
        details={[
          {
            title: "Profit:",
            amount: "£760.51 ",
            changePercentage: 30,
            IconComponent: TrendingUp,
          },
          {
            title: "Loss:",
            amount: "£221.12",
            changePercentage: -15,
            IconComponent: TrendingDown,
          }
        ]}
    


/>
    </div>
  )
}

export default Dashboard