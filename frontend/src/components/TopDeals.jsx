import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import ProductCard from "./ProductCard";

const TopDeals = () => {

  const { products } = useContext(AppContext);

  const deals = products
    .filter(p => p.price - p.offerPrice > 10)
    .slice(0,6);

  return (
    <div className="mt-16">

      <p className="text-2xl md:text-3xl font-medium">
        Top Deals
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 mt-6">
        {deals.map((product,index)=>(
          <ProductCard key={index} product={product}/>
        ))}
      </div>

    </div>
  )
}

export default TopDeals