import React, { useContext, useMemo } from 'react'
import MainBanner from '../components/MainBanner.jsx'
import Categories from '../components/Categories.jsx'
import BestSeller from '../components/BestSeller.jsx'
import BottomBanner from '../components/BottomBanner.jsx'
import { categories } from '../assets/assets.js'
import CategoryProductList from '../components/CategoryProductList.jsx'
import Services from '../components/Services.jsx'

const Home = () => {

  const randomCategories = useMemo(() => {
    return [...categories]
      .sort(() => 0.5 - Math.random())
      .slice(0, 5)
  }, [])

  return (
    <div className='mt-10'>
      <MainBanner />
      <Categories />
      <BestSeller />
      {
        randomCategories.map((category) => (
          <CategoryProductList
            key={category.path}
            category={category.path}
            title={category.text}
          />
        ))
      }
      <BottomBanner />
      <Services />
    </div>
  )
}

export default Home
