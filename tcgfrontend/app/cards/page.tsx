"use client"

import { useState } from "react";
import { useCreateCardMutation, useGetCardsQuery } from "../state/api";
import { PlusCircleIcon, SearchIcon } from "lucide-react";
import Header from "../(components)/Header";
import CreateCardModal from "./CreateCardModal";

type CardFormData = {
    name: string;
    num: string;
    set: string;
    price: number;
    rarity: string;
    quantity: number;
}


const Cards = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: cards, isLoading, isError } = useGetCardsQuery(searchTerm);

  const [createCard] = useCreateCardMutation();
  const handleCreateCard = async (cardData: CardFormData) => {
    await createCard(cardData);
  }

  if(isLoading) {
    return <div className="py-4">Loading...</div>
  }

  if (isError || !cards) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch cards
      </div>
    )
  }
  return (
    <div className="mx-auto pb-5 w-full">
      {/* {SEARCH BAR} */}
      <div className="mb-6">
        <div className="flex items-center border-2 border-gray-200 rounded">
          <SearchIcon className="w-5 h-5 text-gray-500 m-2" />
          <input className="w-full py-2 px-4 rounded bg-white" 
                  placeholder="Search cards..." 
                  value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} 
                  />
        </div>
      </div>

      {/* {HEADER BAR} */}
      <div className="flex justify-between items-center mb-6">
        <Header name="Cards"/>
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 
                      text-gray-200 font-bold py-2 px-4 rounded"
          onClick={() => setIsModalOpen(true)} >
            <PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-200" /> 
              Create Card
          </button>
      </div>

      {/* {BODY CARDS LIST} */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg-grid-cols-3 gap-10 justify-between">
        {isLoading ? (<div>Loading...</div>) : (
          cards?.map((cards) => (
            <div key={cards.cardId} className="border shadow rounded-md p-4 max-w-full w-full mx-auto">
              <div className="flex flex-col items-center"> 
              img
              <h3 className="text-lg text-gray-900 font-semibold">
                {cards.name} | {cards.num}
              </h3>
              <p className="text-gray-800 text-xl font-weight-bold">£{cards.price/100}</p>
                <div className=" flex items-center mt-2 text-sm text-gray-600">
                   {cards.rarity}
                  </div>
                  <div className="flex items-center mt-2">
                  {cards.set}
                  </div>
                  <div className="flex items-center mt-2">
                  Quanity: {cards.quantity}
                  </div>
            </div>
            </div>
          ))
        )}
      </div>
        {/* {MODAL} */}
        <CreateCardModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateCard}
        />


    </div>
  )
}

export default Cards