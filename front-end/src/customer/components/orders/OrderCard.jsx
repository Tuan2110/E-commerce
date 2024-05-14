import { Box, Grid, Typography } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import AdjustIcon from "@mui/icons-material/Adjust";
import React from "react";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";

const OrderCard = ({ order }) => {
  const navigate = useNavigate();
  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "text-yellow-500"; // Màu vàng cho trạng thái đang chờ
      case "PLACED":
        return "text-blue-500"; // Màu xanh cho trạng thái đang xử lý
      case "DELIVERED":
        return "text-green-500"; // Màu xanh lá cây cho trạng thái hoàn thành
      case "CANCELLED":
        return "text-red-500"; // Màu đỏ cho trạng thái đã hủy
      case "CONFIRMED":
        return "text-gray-500";
      case "SHIPPED":
        return "text-pink-500";
    }
  };

  return (
    <Box className="p-5 shadow-lg hover:shadow-2xl border border-gray-200 rounded-md cursor-pointer" onClick={() => navigate(`/orders/${order?.id}`)}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item xs={8}>
          <Grid container spacing={2} alignItems="center">
            {order?.orderItems?.map((item, idx) => (
              <Grid item key={idx}>
                <img
                  className="w-20 h-20 object-cover rounded-md"
                  src={item?.product.thumbnail}
                  alt=""
                />
              </Grid>
            ))}
            <Grid item>
              <Typography variant="body2" color="textSecondary">
                Total Items: {order?.totalItem}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={2}>
          <Typography variant="body1" color="textPrimary">
            <span className="font-semibold">${order?.totalPrice}</span>
          </Typography>
        </Grid>

        <Grid item xs={2}>
          <Typography variant="body1" color="textPrimary">
            <span className={`font-semibold ${getStatusColor(order?.orderStatus)}`}>{order?.orderStatus}</span>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderCard;
