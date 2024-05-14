import { IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import React from "react";
import { useDispatch } from "react-redux";
import { removeCartItem, updateCartItem } from "../../state/cart/Action";

export const CartItem = ({ item }) => {
    const dispatch = useDispatch();

    const handleUpdateCartItem = (num) => {
        const data = { data: { quantity: item.quantity + num }, cartItemId: item.id };
        dispatch(updateCartItem(data));
    };

    const handleRemoveCartItem = () => {
        dispatch(removeCartItem(item.id));
    };

    return (
        <div className="p-4 shadow border rounded-md mb-4">
            <div className="flex items-center">
                <div className="w-20 h-20 lg:w-32 lg:h-32 overflow-hidden rounded-md">
                    <img
                        className="w-full h-full object-cover"
                        src={item.product?.thumbnail}
                        alt={item.product?.title}
                    />
                </div>
                <div className="ml-4 space-y-2">
                    <div className="flex justify-between text-gray-800 font-semibold">
                        <span>{item.product?.title}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-gray-500">
                        <span>{item.product?.brand}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-gray-500">
                        <span>Size: {item.size}</span>
                    </div>
                    <div className="flex justify-between text-gray-800 font-semibold">
                        <span>${item.price}</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between pt-4">
                <div className="flex items-center space-x-2">
                    <IconButton
                        onClick={() => handleUpdateCartItem(-1)}
                        disabled={item.quantity === 1}
                        sx={{ color: '#fea928' }}
                    >
                        <RemoveCircleOutlineIcon />
                    </IconButton>
                    <span className="py-1 px-3 border rounded-sm">
                        {item.quantity}
                    </span>
                    <IconButton
                        onClick={() => handleUpdateCartItem(1)}
                        sx={{ color: '#fea928' }}
                    >
                        <AddCircleOutlineIcon />
                    </IconButton>
                </div>
                <button onClick={handleRemoveCartItem} className="bg-orange-400 text-white font-semibold py-2 px-4 rounded hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                    Remove
                </button>
            </div>
        </div>
    );
};
