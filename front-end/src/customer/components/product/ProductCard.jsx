import React, { useEffect } from 'react'
import "./ProductCard.css"
import { useNavigate } from 'react-router-dom'

const ProductCard = ({product}) => {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(`/product/${product.id}`)} className="productCard w-[15rem] m-3 transition-all cursor-pointer shadow-lg hover:shadow-xl rounded-lg overflow-hidden">
            <div className="h-[20rem]">
                <img className="h-full w-full object-cover" src={product.thumbnail} alt={product.title} />
            </div>
            <div className="textPart bg-white p-3">
                <div>
                    <p className="font-semibold opacity-60">{product.brand}</p>
                    <p className="font-medium">{product.title}</p>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <span className="px-2 py-1 text-xs text-white bg-gradient-to-r from-primary to-secondary rounded-full">{product.color}</span>
                    <p className="font-semibold">${product.price}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductCard