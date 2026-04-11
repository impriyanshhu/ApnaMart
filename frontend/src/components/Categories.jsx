import React, { useContext } from 'react'
import { assets, categories } from '../assets/assets.js'
import { AppContext } from '../context/AppContext.jsx'

const Categories = () => {

    const { navigate } = useContext(AppContext)

    return (
        <div className='mt-16'>
            <p className='text-2xl md:text-3xl font-medium'>Categories</p>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-6 mt-6 gap-5'>

                {
                    categories.map((category, index) => (
                        <div
                            key={index}
                            className='group cursor-pointer p-2 sm:p-3 gap-2 rounded-lg flex flex-col justify-center items-center'
                            style={{ backgroundColor: category.bgColor }}
                            onClick={() => {
                                navigate(`/products/${category.path.toLowerCase()}`);
                                scrollTo(0, 0)
                            }}
                        >
                            <img src={category.image} alt={category.text} className='group-hover:scale-105 transition w-28 md:w-32' />
                            <p className='text-sm sm:text-base font-medium'>{category.text}</p>
                        </div>
                    ))
                }

            </div>

        </div>
    )
}

export default Categories
