import {
  Button,
  Divider,
  Grid,
  Rating,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { findProductById } from "../../../state/product/Action";
import { createReview } from "../../../state/review/Action";

const Review = () => {
  const [formData, setFormData] = useState({review: "" ,rating:1});
  const [rating, setRating] = useState();
  const isLargeScreen = useMediaQuery("(min-width:1200px)");
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store);
  const { productId , itemId } = useParams();
  const navigate=useNavigate();

  const handleRateProduct = (e, value) => {
    setRating(value);
    formData.rating=value;
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createReview({review : formData,productId,itemId}))
    setFormData({review:""})
    navigate(`/product/${productId}`)

  };
  useEffect(() => {
    dispatch(findProductById( productId ));
  }, []);
  return (
    <div className="px-5 lg:px-20 mb-20">
      <h1 className="text-xl p-5 shadow-lg mb-8 font-bold">
        Rate & Review Product
      </h1>
      <Grid sx={{ justifyContent: "space-between" }} container>
        <Grid
          className="flex  lg:items-center shadow-lg border rounded-md p-5"
          item
          xs={12}
          lg={5.8}
        >
          <div>
            <img
              className="w-[5rem] lg:w-[15rem]"
              src={products.product?.thumbnail}
              alt=""
            />
          </div>
          <div className="ml-3 lg:ml-5 space-y-2 lg:space-y-4">
            <p className="lg:text-lg">{products.product?.title}</p>
            <p className="opacity-50 font-semibold">
              {products.product?.brand}
            </p>
            <p>${products.product?.price}</p>
            {/* <p>Size: M</p> */}
          {products.product?.color && <p>Color: {products.product?.color}</p>}
            <div className="flex items-center space-x-3">
              <Rating name="read-only" value={4.6} precision={0.5} readOnly />

              <p className="opacity-60 text-sm">42807 Ratings</p>
              <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                {3789} reviews
              </p>
            </div>
            <div>
              <p className="space-y-2 font-semibold">
                <FiberManualRecordIcon
                  sx={{ width: "15px", height: "15px" }}
                  className="text-green-600  mr-2"
                />
                <span>Delivered</span>{" "}
              </p>
              <p className="text-xs">Your Item Has Been Delivered</p>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} lg={6}>
          <div className={`${!isLargeScreen ? "py-10" : ""} space-y-5`}>
            <div className="shadow-md border rounded-md p-5">
              <Typography className="font-semibold" component="legend">
                Rate This Product
              </Typography>
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                  handleRateProduct(event, newValue);
                }}
              />
            </div>
            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-5 shadow-md border rounded-md"
            >
              <TextField
                label="Review"
                variant="outlined"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                value={formData.review}
                onChange={handleChange}
                name="review"
              />
              <Button type="submit" variant="contained" sx={{ mt: 2, bgcolor:'#fea928', ":hover": { bgcolor: '#fea930' } }}>
                Submit Review
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Review;
