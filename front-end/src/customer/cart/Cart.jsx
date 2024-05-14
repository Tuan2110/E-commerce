import React, { useEffect } from 'react'
import {CartItem} from './CartItem'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCart } from '../../state/cart/Action'
import store from '../../state/store'

export const Cart = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {cart} = useSelector(store=>store)
    

    const handleCheckout = () => {
        navigate('/checkout?step=2')
    }

    useEffect(() => {
        dispatch(getCart())
    }, [cart.updateCartItem,cart.deleteCartItem])

    return ( 
        <div>
            {cart.cart?.cartItems.length===0 ? 
            (<div className="text-center">
                <h1 className='font-semibold text-6xl mb-10'>No items in cart</h1>
                <button onClick={()=>navigate('/')} className=" bg-orange-400 mb-80 text-white font-semibold py-2 px-4 rounded hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50">
                    Go to Home
                </button>
            </div>) 
            :
            (<div className='lg:grid grid-cols-3 lg:px-16 relative'>
                <div className='col-span-2'>
                    {cart.cart?.cartItems.map(item=><CartItem item={item}/>)}
                </div>
                <div className='px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0'>
                    <div className="border-2 border-gray-300 rounded-lg p-4 shadow-md">
                        <p className="uppercase font-bold text-gray-600 pb-2 border-b">Price Details</p>
                        <div className="space-y-4 font-semibold my-4">
                            <div className="flex justify-between items-center text-black">
                                <span>Price</span>
                                <span>${cart.cart?.totalPrice}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Delivery Charge</span>
                                <span className="text-green-500 font-bold">Free</span>
                            </div>
                            <div className="flex justify-between items-center text-black font-bold">
                                <span>Total Amount</span>
                                <span className="text-green-500">${cart.cart?.totalPrice}</span>
                            </div>
                        </div>
                        <button onClick={handleCheckout} className="w-full bg-orange-400 text-white font-semibold py-2 px-4 rounded hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                            Checkout
                        </button>
                    </div>
                </div>
            </div>)}
        </div>
    )
}
