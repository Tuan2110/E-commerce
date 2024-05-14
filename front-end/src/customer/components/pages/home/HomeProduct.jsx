import React, { useEffect } from "react";
import StarIcon from '@mui/icons-material/Star';
import { useDispatch, useSelector } from "react-redux";
import { getTopSale } from "../../../../state/product/Action";
import { useNavigate } from "react-router-dom";

const HomeProduct = () => {
    const dispatch = useDispatch();
    const {products} = useSelector(store=>store)
    const navigate = useNavigate()

    useEffect(()=>{
        dispatch(getTopSale());
    },[])


    return (
        <div className="mt-14 mb-12">
            <div className="container">
                {/* Header section */}
                <div className="text-center mb-10 max-w-[600px] mx-auto">
                    <p data-aos="fade-up" className="text-sm text-primary">
                        Top Selling Products for you
                    </p>
                    <h1 data-aos="fade-up" className="text-3xl font-bold">
                        Products
                    </h1>
                    <p data-aos="fade-up" className="text-xs text-gray-400">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit
                        asperiores modi Sit asperiores modi
                    </p>
                </div>
                {/* Body section */}
                <div >
                    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5">
                        {/* card section */}
                        {products.topProducts.map((data) => (
                            <div
                                data-aos="fade-up"
                                data-aos-delay={data.aosDelay}
                                key={data.id}
                                className="space-y-3 cursor-pointer hover:opacity-80"
                                onClick={()=>navigate(`/product/${data.id}`)}
                            >
                                <img
                                    src={data.thumbnail}
                                    alt=""
                                    className="h-[220px] w-[150px] object-cover rounded-md"
                                />
                                <div>
                                    <h3 className="font-semibold">{data.title}</h3>
                                    <p className="text-sm text-gray-600">{data.color}</p>
                                    <div className="flex items-center gap-1">
                                        <StarIcon className="text-yellow-400" />
                                        <span>{4.5}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* view all button */}
                    <div className="flex justify-center">
                        {/* <button className="text-center mt-10 cursor-pointer bg-primary text-white py-1 px-5 rounded-md">
                            View All Button
                        </button> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeProduct;
