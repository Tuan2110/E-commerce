import { Avatar, Box, Grid, LinearProgress, Rating } from "@mui/material";
import React from "react";

export const ProductReviewCard = ({ review }) => {
    function ReviewDate({ createdAt }) {
        const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
        return <p className="opacity-70">{formattedDate}</p>;
    }
    return (
        <div class="p-4 max-w-md mx-auto bg-white rounded-lg border shadow-md sm:p-6 lg:p-8">
            <div class="flex items-center">
                <div class="flex-shrink-0">
                    <Avatar
                        className="text-white h-12 w-12 rounded-full"
                        sx={{ width: "56", height: "56", bgcolor: "#9155fd" }}
                    >
                        {review?.user?.firstName[0]}
                    </Avatar>
                </div>
                <div class="ml-3">
                    <p class="text-sm font-medium text-gray-900">{review?.user?.firstName + " " + review?.user?.lastName}</p>
                    <p class="text-sm text-gray-500"><ReviewDate createdAt={review?.createdAt} /></p>
                </div>
            </div>
            <div class="mt-4">
                <div class="flex items-center">
                    <div class="flex gap-0.5 text-yellow-400">
                        <Rating value={review?.rating} name="half-rating" readOnly precision={0.5} />
                    </div>
                </div>
                <p class="mt-2 text-gray-700 text-sm">
                    {review?.review}
                </p>
            </div>
        </div>
    );
};
