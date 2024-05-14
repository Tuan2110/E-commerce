import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navigation from '../customer/components/navigation/Navigation'
import { HomePage } from '../customer/components/pages/home/HomePage'
import Product from '../customer/components/product/Product'
import ProductDetail from '../customer/components/productdetail/ProductDetail'
import { Cart } from '../customer/cart/Cart'
import Checkout from '../customer/checkout/Checkout'
import { PaymentSuccess } from '../customer/components/payment/PaymentSuccess'
import Order from '../customer/components/orders/Order'
import OrderDetails from '../customer/components/orders/OrderDetails'
import Footer from '../customer/components/footer/Footer'
import Review from '../customer/components/review/Review'

export const CustomerRouter = () => {
    return (
        <div>
            <div>
                <Navigation/>
            </div>
            <Routes>
                <Route path='/login' element={<HomePage/>}></Route>
                <Route path='/register' element={<HomePage/>}></Route>
                <Route path='/' element={<HomePage/>}></Route>
                <Route path='/:category/:secondLvCategory/:thirdLvCategory' element={<Product/>}></Route>
                <Route path='/product/:productId' element={<ProductDetail/>}></Route>
                <Route path='/cart' element={<Cart/>}></Route>
                <Route path='/checkout' element={<Checkout/>}></Route>
                <Route path='/payment/:orderId' element={<PaymentSuccess/>}></Route>
                <Route path="/orders" element={<Order />}></Route>
                <Route path="/orders/:orderId" element={<OrderDetails />}></Route>
                <Route path="/review/product/:productId/item/:itemId" element={<Review />}></Route>
            </Routes>
            <div>
                <Footer/>
            </div>
        </div>
    )
}
