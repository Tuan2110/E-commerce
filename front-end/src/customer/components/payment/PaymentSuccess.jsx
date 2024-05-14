import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updatePayment } from '../../../state/payment/Action'
import { getOrderById } from '../../../state/order/Action'
import OrderTraker from '../orders/OrderTraker'
import { Alert, AlertTitle, Grid } from '@mui/material'
import { AddressCard } from '../../checkout/AddressCard'

export const PaymentSuccess = () => {
    const [paymentId, setPaymentId] = useState()
    const [paymentStatus, setPaymentStatus] = useState()
    const {orderId} = new useParams()

    // http://localhost:3000/payment/2?
    // vnp_Amount=75795000&
    // vnp_BankCode=NCB&
    // vnp_BankTranNo=VNP14380746&
    // vnp_CardType=ATM&
    // vnp_OrderInfo=Thanh+toan+don+hang%3A99277929&
    // vnp_PayDate=20240416115928&
    // vnp_ResponseCode=00&
    // vnp_TmnCode=DG3KQOVE&v
    // np_TransactionNo=14380746&
    // vnp_TransactionStatus=00&
    // vnp_TxnRef=99277929&
    // vnp_SecureHash=048f5f573f4f4ed28aa3e2f9727fe101f56cd63d8cf4cabb8bf0444784475918c9a86ab0a6cb000234d020aa16b0b7808b768f3a7f28bc4afc17669b8f1c3d96

    const dispatch = useDispatch()
    const {order} = useSelector((store) => store)

    useEffect(() => {
        const urlParam = new URLSearchParams(window.location.search)
        setPaymentId(urlParam.get('vnp_TxnRef'))
        setPaymentStatus(urlParam.get('vnp_TransactionStatus'))
    }
    , [])
    useEffect(() => {
        const data = {paymentId,orderId,paymentStatus}
        dispatch(getOrderById(orderId))
        dispatch(updatePayment(data))
    }, [orderId, paymentId])
    return (
        <div className="px-2 lg:px-36">
            <div className="flex flex-col justify-center items-center">
                <Alert
                variant="filled"
                severity="success"
                sx={{ mb: 6, width: "fit-content" }}
                >
                <AlertTitle>Payment Success</AlertTitle>
                Congratulation Your Order Get Placed
                </Alert>
            </div>

            <OrderTraker activeStep={1}/>

            <div className='mt-10'>
                <Grid container spacing={4}>
                    <Grid xs={12} lg={8} className="border rounded-e-md shadow-md mt-8">
                        <div className="mt-5">
                            {order.order?.orderItems.map((item) => (
                                <div className="m-5 border">
                                    <div className="flex items-center m-3">
                                        <div className="w-20 h-20 lg:w-36 lg:h-36 overflow-hidden rounded-md mr-4">
                                            <img
                                                className="w-full h-full object-cover"
                                                src={item.product?.thumbnail}
                                                alt={item.product?.title}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="text-left text-lg font-semibold">
                                                {item.product?.title}
                                            </div>
                                            <div className="text-left font-semibold">{item.product?.brand}</div>
                                            <div className="text-left font-semibold">${item.price}</div>
                                            <div className="text-left font-semibold">
                                                Size: {item.size}, Quantity: {item.quantity}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <div className="border rounded-lg p-4 shadow-md space-y-1">
                            <p className="text-left">
                                <span className="font-semibold">FullName:</span>{" "}
                                {order.order?.shippingAddress.firstName}{" "}
                                {order.order?.shippingAddress.lastName}
                            </p>
                            <p className="text-left">
                                <span className="font-semibold">Address:</span>{" "}
                                {order.order?.shippingAddress.streetAddress},{" "}
                                {order.order?.shippingAddress.city}
                            </p>
                            <p className="text-left">
                                <span className="font-semibold">Mobile:</span>{" "}
                                {order.order?.shippingAddress.mobile}
                            </p>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
