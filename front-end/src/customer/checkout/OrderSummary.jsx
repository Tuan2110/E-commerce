import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getOrderById } from "../../state/order/Action";
import { Grid } from "@mui/material";
import { api } from "../../config/apiConfig";
import { createPayment } from "../../state/payment/Action";

export const OrderSummary = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { order } = useSelector((store) => store);

    const searchParams = new URLSearchParams(location.search);
    const orderId = searchParams.get("order_id");
    useEffect(() => {
        dispatch(getOrderById(orderId));
    }, [orderId]);

    const handleCheckout = (event) => {
        dispatch(createPayment( orderId ));
    };

    useEffect(() => {
        dispatch(getOrderById(orderId));
    }, [orderId]);
    return (
        <div>
            <Grid container spacing={4}>
                <Grid xs={12} lg={8} className="border rounded-e-md shadow-md mt-8">
                    <div className="mt-5">
                        <h1 className="text-xl font-semibold mb-4">Order Items</h1>
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
                        <h1 className="text-xl font-semibold mb-2">Shipping Address</h1>
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

                    <div className="mt-5">
                        <div className="border rounded-lg p-4 shadow-md">
                            <h1 className="text-xl font-semibold mb-4">Price Details</h1>
                            <div className="space-y-4 font-semibold my-4">
                                <div className="flex justify-between items-center text-black">
                                    <span>Price</span>
                                    <span>${order.order?.totalPrice}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Delivery Charge</span>
                                    <span className="text-green-500 font-bold">Free</span>
                                </div>
                                <div className="flex justify-between items-center text-black font-bold">
                                    <span>Total Amount</span>
                                    <span className="text-green-500">
                                        ${order.order?.totalPrice}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={(event)=>handleCheckout(event)}
                                className="w-full bg-orange-400 text-white font-semibold py-2 px-4 rounded hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50"
                            >
                                Payment
                            </button>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};
