import React from 'react'
import { useGetDashboardMetricsQuery } from '../state/api'



const PopularCards = () => {
    const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();


  return (

    <div className='row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl pb-16'>
        {isLoading ? (
            <div className= "m-5">Loading ...'</div>
  ): (
    <>
        <h3 className='text-lg font-semibold px-7 pt-5 pb-2'>
            Popular Cards
        </h3>
        <hr />
        <div className='overflow-auto h-full'>
            {dashboardMetrics?.popularCards.map((card) =>(
                <div
                key={card.cardId}
                className='flex items-center justify-between gap-3 px-5 py-7 border-b'
                >
                    <div className='flex items-center gap-3'>
                    <div>img</div>
                    <div className='flex flex-col justify-between gap-1'>
                    <div className='font-bold text-gray-700'>{card.name}</div>
                    <div className='flex text-sm items-center'>
                        <span className='font-bold text-blue-500 text-xs'>
                         {card.num}
                        </span>
                        <span className='m-4'>|</span>
                        <div className='font-bold text-blue-500 text-xs'>{card.set}</div>
                    </div>
                  </div>
                 </div>
                <div className='font-bold text-blue-800 text-m p-2  bg-white-300 mr-2'>
                    £{card.price/100}
                </div>
            <div className='text-xs flex items-center font-bold text-blue-500 text-m'>
                <button className='p-2 font-bold  mr-2'>
                {card.rarity}
                </button>
                <div className='font-bold text-blue-800 text-m p-2   mr-2'>
                QTY:{card.quantity}</div>
            </div>
        </div>

    ))}
</div>
    </>
  )}
  </div>

);
}

export default PopularCards