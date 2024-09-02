import React, { ChangeEvent, FormEvent, useState } from 'react'
import { v4 } from 'uuid'
import Header from '../(components)/Header';

type CardFormData = {
    name: string;
    num: string;
    set: string;
    price: number;
    rarity: string;
    quantity: number;
}

type CreateCardModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (formData: CardFormData) => void;
}

const CreateCardModal = ({isOpen, onClose, onCreate
        }: CreateCardModalProps) => {
            const [formData, setFormData] = useState({
                cardId: v4(),
                name: "",
                num: "",
                set:"",
                price: 0,
                rarity: "",
                quantity: 0,
            })

const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData({
        ...formData,
        [name]:
            name=== "price" || name=== "quantity"
            ? parseFloat(value)
            :value,
    })
}


const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onCreate(formData);
        onClose();
            }

            if (!isOpen) return null;

            const labelCssStyles = 'block text-sm font-medium text-gray-700'
            const inputCssStyles = 'block w-full mb-2 p-2 border-gray-500 border-2 rounded md'
  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20'>
        <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
            <Header name="Create New Card"/>
            <form onSubmit={handleSubmit} className='mt-5'>
                {/* {CARD NAME} */}
                <label htmlFor='productName' className={labelCssStyles}>
                    Card Name
                </label>
                <input type="text" name="name" placeholder='Name'
                    onChange={handleChange}
                    value={formData.name}
                    className={inputCssStyles} required />
                   {/* {NUMBER} */}
                   <label htmlFor='cardPrice' className={labelCssStyles}>
                    Card Number
                </label>
                <input type="text" name="num" placeholder='Number'
                    onChange={handleChange}
                    value={formData.num}
                    className={inputCssStyles} required />
                   {/* {SET} */}
                   <label htmlFor='cardSet' className={labelCssStyles}>
                    Card Set
                </label>
                <input type="text" name="set" placeholder='Set'
                    onChange={handleChange}
                    value={formData.set}
                    className={inputCssStyles} required />
                   {/* {PRICE} */}
                   <label htmlFor='cardPrice' className={labelCssStyles}>
                    Card Price
                </label>
                <input type="number" name="price" placeholder='Price'
                    onChange={handleChange}
                    value={formData.price}
                    className={inputCssStyles} required />
                   {/* {Rarity} */}
                   <label htmlFor='cardRarity' className={labelCssStyles}>
                    Card Rarity
                </label>
                <input type="text" name="rarity" placeholder='Rarity'
                    onChange={handleChange}
                    value={formData.rarity}
                    className={inputCssStyles} required />
                   {/* {Quantity} */}
                   <label htmlFor='productName' className={labelCssStyles}>
                    Card Quantity
                </label>
                <input type="number" name="quantity" placeholder='Quantity'
                    onChange={handleChange}
                    value={formData.quantity}
                    className={inputCssStyles} required />

                {/* {Actions} */}
                <button type="submit" className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'
                >
                 Create
                </button>
                <button
                onClick={onClose}
                 type="button" className='ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700'
                 >
                Cancel
                 </button>
                
            </form>
        </div>

        </div>
  )
}

export default CreateCardModal