import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import OrderTraker from "./OrderTraker";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate, useParams } from "react-router-dom";
import { deepOrange, deepPurple } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AddressCard } from "../../checkout/AddressCard";
import { getOrderById } from "../../../state/order/Action";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { orderId } = useParams();
  const { order } = useSelector((store) => store);

  console.log("order", order.order);

  useEffect(() => {
    dispatch(getOrderById(orderId));
  }, []);

  const navigate = useNavigate();
  return (
    <div className=" px-2 lg:px-36 space-y-7 mb-20">
      <Grid container className="p-3 shadow-lg">
        <Grid item xs={12}>
          <div className="ml-5">
            <p className="font-bold text-left text-lg py-2">Delivery Address</p>
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
      <Box className="p-5 shadow-lg border rounded-md">
        <Grid
          container
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Grid item xs={12}>
            <OrderTraker
              activeStep={
                order.order?.orderStatus === "PLACED"
                  ? 1
                  : order.order?.orderStatus === "CONFIRMED"
                    ? 2
                    : order.order?.orderStatus === "SHIPPED"
                      ? 3
                      : 5
              }
            />
          </Grid>
          {/* <Grid item>
            {order.order?.orderStatus === "DELIVERED" && <Button sx={{ color: "" }} color="error" variant="text" >
              RETURN
            </Button>}

            {order.order?.orderStatus !== "DELIVERED" && <Button sx={{ color: deepPurple[500] }} variant="text">
              cancel order
            </Button>}
          </Grid> */}
        </Grid>
      </Box>



      <Grid container className="space-y-5">
        {order.order?.orderItems.map((item) => (
          <Grid
            container
            item
            className="shadow-xl rounded-md p-5 border"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Grid item xs={6}>
              {" "}
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
            </Grid>
            <Grid item>
              { order.order?.orderStatus === "DELIVERED" && item.reviewed === false &&
                <Box
                  sx={{ color: deepOrange[400] }}
                  onClick={() => navigate(`/review/product/${item.product.id}/item/${item.id}`)}
                  className="flex items-center cursor-pointer"
                >
                  <StarIcon
                    sx={{ fontSize: "2rem" }}
                    className="px-2 text-5xl"
                  />
                  <span>Rate & Review Product</span>
                </Box>
              }
              { order.order?.orderStatus === "DELIVERED" && item.reviewed === true &&
                <Box
                  sx={{ color: deepOrange[400] }}
                  className="flex items-center opacity-70"
                >
                  {/* <StarIcon
                    sx={{ fontSize: "2rem" }}
                    className="px-2 text-5xl"
                  /> */}
                  <span>Reviewed</span>
                </Box>
              }
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
// sx={{width:"10px",height:"10px"}}
export default OrderDetails;
