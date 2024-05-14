import { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { Box, Grid, LinearProgress, Rating } from "@mui/material";
import { ProductReviewCard } from "./ProductReviewCard";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProductById } from "../../../state/product/Action";
import { addItemToCard, getCart } from "../../../state/cart/Action";
import Alert from '@mui/material/Alert';
import { getAllReviews } from "../../../state/review/Action";


const product = {
    sizes: [
        { name: "S", inStock: true },
        { name: "M", inStock: true },
        { name: "L", inStock: true }
    ]
}

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function ProductDetail() {
    const [open, setOpen] = useState(false);
    const [selectedSize, setSelectedSize] = useState("");
    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch()
    const {products,review} = useSelector(store=>store)

    const handleAddToCart = (event) => {
        event.preventDefault()
        const size = selectedSize ? selectedSize.name : "M" 
        const data = {productId:params.productId,size:size}
        dispatch(addItemToCard(data))
        setOpen(true)
        setTimeout(() => {
            setOpen(false);
        }, 2000);
    }
    useEffect(() => {
        dispatch(findProductById(params.productId))
    },[params.productId])

    useEffect(() => {
        dispatch(getCart())
    }, [open])

    useEffect(() => {
        dispatch(getAllReviews(params.productId))
    }, [params.productId])

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === products.product?.productImages.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);
        return () => clearInterval(intervalId);
    }, [products.product?.productImages.length]);

    return (
        <div className="bg-white lg:px-20">
            {open && (
                <Alert severity="success" onClose={() => setOpen(false)}>
                    Added to cart successfully!
                </Alert>
            )}
            <div className="pt-6">
                <nav aria-label="Breadcrumb">
                    <ol
                        role="list"
                        className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
                    >
                        <li className="text-sm">
                            <a
                                href={products.product?.href}
                                aria-current="page"
                                className="font-medium text-gray-500 hover:text-gray-600"
                            >
                                {products.product?.category?.parentCategory?.parentCategory?.name.toUpperCase()}/
                                {products.product?.category?.parentCategory?.name.toUpperCase()}/
                                {products.product?.category?.name.toUpperCase()}
                            </a>
                        </li>
                    </ol>
                </nav>
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10">
                    {/* Image gallery */}
                    <div className="flex flex-col items-center">
                        <div className="overflow-hidden rounded-lg max-w-lg mx-auto shadow-lg">
                            <img
                                src={products.product?.productImages[currentIndex].image_url}
                                alt={`Image ${products.product?.productImages[currentIndex].id}`}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        <div className="flex flex-wrap -m-1 justify-center mt-5">
                            {products.product?.productImages.map((item, index) => (
                                <div key={index} className="p-1">
                                    <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg w-24">
                                        <img
                                            src={item.image_url}
                                            alt={`Thumbnail ${item.id}`}
                                            className={`h-full w-full object-cover object-center ${currentIndex === index ? 'ring-2 ring-offset-2 ring-indigo-500' : ''}`}
                                            onClick={() => setCurrentIndex(index)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product info */}
                    <div className="lg:col-span-1 max-auto max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24">
                        {/* <div className="lg:col-span-2 ">
                            <h1 className="text-lg lg:text-xl font-semibold text-gray-900">
                                {products.product?.brand} 
                            </h1>
                            <h1 className="text-lg lg:text-xl text-gray-900 opacity-60 pt-1">
                                {products.product?.title}
                            </h1>
                        </div> */}

                        {/* Options */}
                        <div className="mt-4 lg:row-span-3 lg:mt-0">
                            <h2 className="sr-only">Product information</h2>
                            {/* product.title and product.brand */}
                            <div className="flex items-center space-x-5 text-gray-900">
                                <p className="font-semibold text-[2rem]">{products.product?.title}</p>
                            </div>
                            <div className="flex items-center space-x-5 text-gray-500 mt-3">
                                <p className="font-semibold text-2xl">{products.product?.brand}</p>
                            </div>
                            <div className="flex space-x-5 items-center text-[2rem] text-gray-900 mt-3">
                                <p className="font-semibold">${products.product?.price}</p>
                            </div>

                            {/* Reviews */}
                            <div className="mt-6">
                                <div className="flex items-center space-x-3">
                                <Rating name="read-only" value={4.5} readOnly precision={.5}/>
                                <p className="opacity-50 text-sm">56540 Ratings</p>
                                <p className="ml-3 text-sm font-medium text-green-500 hover:text-green-600">3870 Reviews</p>
                                </div>
                            </div>

                            <form className="mt-10">
                                {/* Sizes */}
                                <div className="mt-10">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-medium text-gray-900">Size</h3>
                                    </div>

                                    <RadioGroup
                                        value={selectedSize}
                                        onChange={setSelectedSize}
                                        className="mt-4"
                                    >
                                        <RadioGroup.Label className="sr-only">
                                            Choose a size
                                        </RadioGroup.Label>
                                        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                                            {product.sizes.map((size) => (
                                                <RadioGroup.Option
                                                    key={size.name}
                                                    value={size}
                                                    disabled={!size.inStock}
                                                    className={({ active }) =>
                                                        classNames(
                                                            size.inStock
                                                                ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                                                : "cursor-not-allowed bg-gray-50 text-gray-200",
                                                            active ? "ring-2 ring-orange-400" : "",
                                                            "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                                                        )
                                                    }
                                                >
                                                    {({ active, checked }) => (
                                                        <>
                                                            <RadioGroup.Label as="span">
                                                                {size.name}
                                                            </RadioGroup.Label>
                                                            {size.inStock ? (
                                                                <span
                                                                    className={classNames(
                                                                        active ? "border" : "border-2",
                                                                        checked
                                                                            ? "border-orange-200"
                                                                            : "border-transparent",
                                                                        "pointer-events-none absolute -inset-px rounded-md"
                                                                    )}
                                                                    aria-hidden="true"
                                                                />
                                                            ) : (
                                                                <span
                                                                    aria-hidden="true"
                                                                    className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                                                >
                                                                    <svg
                                                                        className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                                                        viewBox="0 0 100 100"
                                                                        preserveAspectRatio="none"
                                                                        stroke="currentColor"
                                                                    >
                                                                        <line
                                                                            x1={0}
                                                                            y1={100}
                                                                            x2={100}
                                                                            y2={0}
                                                                            vectorEffect="non-scaling-stroke"
                                                                        />
                                                                    </svg>
                                                                </span>
                                                            )}
                                                        </>
                                                    )}
                                                </RadioGroup.Option>
                                            ))}
                                        </div>
                                    </RadioGroup>
                                </div>

                                <button onClick={(event)=>handleAddToCart(event)} className="flex mt-5 bg-gradient-to-r from-primary to-secondary text-white font-semibold py-2 px-4 rounded hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-opacity-50">
                                    Add to Cart
                                </button>
                                
                            </form>
                        </div>

                        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                            {/* Description and details */}
                            <div className="mt-10">
                                <h3 className="flex text-sm font-medium text-gray-900">Description</h3>

                                <div className="mt-4">
                                    <p className="text-sm text-gray-900 font-serif">{products.product?.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Rating and Reviews */}
                <section className="mt-10">
                    <h1 className="font-semibold text-lg pb-4">Recent Review & Rating</h1>
                    <div className="border p-5">
                    <Grid container spacing={7}>
                        <Grid item xs={7}>
                            <div className="space-y-5">
                                {review.reviews.map((review) => <ProductReviewCard review={review} />)}
                            </div>
                        </Grid>

                        <Grid item xs={5}>
                            <h1 className="text-xl font-semibold pb-2">Product Ratings</h1>
                            <div className="flex items-center space-x-3">
                                <Rating value={4.6} precision={.5} readOnly />
                                <p className="opacity-60">1564654 Ratings</p>
                            </div>

                            <Box className='mt-5 space-y-3'>
                                <Grid container alignItems='center' gap={2}>
                                    <Grid item xs={2}>
                                        <p>Excellent</p>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <LinearProgress sx={{bgcolor:'#d0d0d0',borderRadius:4,height:7}} variant="determinate" value={40} color="success"/>
                                    </Grid>
                                </Grid>

                                <Grid container alignItems='center' gap={2}>
                                    <Grid item xs={2}>
                                        <p>Very Good</p>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <LinearProgress sx={{bgcolor:'#d0d0d0',borderRadius:4,height:7}} variant="determinate" value={30} color="success"/>
                                    </Grid>
                                </Grid>

                                <Grid container alignItems='center' gap={2}>
                                    <Grid item xs={2}>
                                        <p>Good</p>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <LinearProgress sx={{bgcolor:'#d0d0d0',borderRadius:4,height:7}} variant="determinate" value={25} className="bg-yellow-300"/>
                                    </Grid>
                                </Grid>

                                <Grid container alignItems='center' gap={2}>
                                    <Grid item xs={2}>
                                        <p>Avarage</p>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <LinearProgress sx={{bgcolor:'#d0d0d0',borderRadius:4,height:7}} variant="determinate" value={20} color="warning"/>
                                    </Grid>
                                </Grid>

                                <Grid container alignItems='center' gap={2}>
                                    <Grid item xs={2}>
                                        <p>Poor</p>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <LinearProgress sx={{bgcolor:'#d0d0d0',borderRadius:4,height:7}} variant="determinate" value={10} color="error"/>
                                    </Grid>
                                </Grid>
                            </Box>

                        </Grid>

                    </Grid>
                </div>
                </section>

                {/* Similer products */}
                <section className="pt-10">
                    <h1 className="py-5 text-xl font-bold">Similer Products</h1>

                    <div className="flex flex-wrap space-y-5">
                        {/* {[1,1,1].map((item) => <HomeSectionCard product={item}/>)} */}
                    </div>
                </section>
            </div>
        </div>
    );
}
