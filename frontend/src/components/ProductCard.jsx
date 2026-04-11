import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets.js';
import { AppContext } from '../context/AppContext';

const ProductCard = ({ product }) => {

    const { currency, cartItems, addToCart, removeFromCart, navigate } = useContext(AppContext);

    return product && (
        <div onClick={()=> {navigate(`/products/${product.category.toLowerCase()}/${product._id}`); scrollTo(0,0);}} className="border border-gray-500/20 rounded-md md:px-4 px-2 pb-2 md:pb-4 bg-white max-w-56 w-full ">
            <div className="group cursor-pointer flex items-center justify-center">
                <img className="group-hover:scale-105 transition max-w-24 md:max-w-32" src={product.image[0]} alt={product.name} />
            </div>
            <div className="text-gray-500/60 text-xs sm:text-sm">
                <p>{product.category}</p>
                <p className="text-gray-700 font-medium text-sm sm:text-base md:text-lg truncate w-full">{product.name}</p>
                <div className="hidden sm:flex items-center gap-0.5">
                    {Array(5).fill('').map((_, i) => (
                        <img key={i} className='w-3 md:w-3.5' src={i < 4 ? assets.star_icon : assets.star_dull_icon} alt="" />
                    ))}
                    <p>(4)</p>
                </div>
                <div className="flex items-end justify-between mt-2 sm:mt-3">
                    <p className="md:text-xl text-base font-medium text-primary">
                        {currency}{product.offerPrice} <span className="text-gray-500/60 md:text-sm text-xs line-through">{currency}{product.price}</span>
                    </p>
                    <div onClick={(e)=> {e.stopPropagation();}} className="text-primary">
                        {!cartItems[product._id] ? (
                            <button className="flex items-center justify-center gap-1 bg-primary/10 border border-primary/40 md:w-20 w-14 h-8 rounded cursor-pointer" onClick={() => addToCart(product._id)} >
                                <img src={assets.cart_icon} alt="" className='cart_icon'/>
                                Add
                            </button>
                        ) : (
                            <div className="flex items-center justify-center gap-2 md:w-20 w-14 h-8 bg-primary/25 rounded select-none">
                                <button onClick={() => removeFromCart(product._id)} className="cursor-pointer text-sm md:text-md px-2 h-full" >
                                    -
                                </button>
                                <span className="w-4 text-center">{cartItems[product._id]}</span>
                                <button onClick={() => addToCart(product._id)} className="cursor-pointer text-sm md:text-md px-2 h-full" >
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard
