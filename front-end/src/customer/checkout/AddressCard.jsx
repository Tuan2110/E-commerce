import { Button } from "@mui/material";
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createOrder } from "../../state/order/Action";

export const AddressCard = ({ address }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSubmit=()=>{
        console.log(address);
        const orderData = {address,navigate}
        console.log("orderData",orderData);
        dispatch(createOrder(orderData))
        console.log(address);
    }
    return (
        <div className="p-4 bg-white rounded-lg shadow-md mb-2">
            <div className="space-y-3">
                <p className="font-semibold">
                    Fullname: {address?.firstName} {address?.lastName}
                </p>
                <p>
                    Address: {address?.state}, {address?.streetAddress}, {address?.zipCode}
                </p>
                <div className="space-y-1">
                    <p className="">Phone Number: {address?.mobile}</p>
                    
                </div>
                <Button
                    onClick={handleSubmit}
                    sx={{ mt: 2, bgcolor:'#fea928', ":hover": { bgcolor: '#fea930' } }}
                    size="large"
                    variant="contained"
                >
                    Delivery Here
                </Button>
            </div>
        </div>
    );
};
