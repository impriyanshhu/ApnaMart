import React, { useContext } from 'react'
import ProductCard from './ProductCard.jsx'
import { AppContext } from '../context/AppContext.jsx'

const CategoryProductList = ({ category, title }) => {

  const { products } = useContext(AppContext)

  const filteredProducts = products.filter(
    (product) =>
      product.category?.toLowerCase() === category?.toLowerCase()
  )

  if (filteredProducts.length === 0) return null

  return (
    <div className='mt-16'>
      <p className='text-2xl md:text-3xl font-medium'>
        {title}
      </p>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6'>
        {
          filteredProducts.slice(0, 5).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        }
      </div>
    </div>
  )
}

export default CategoryProductList