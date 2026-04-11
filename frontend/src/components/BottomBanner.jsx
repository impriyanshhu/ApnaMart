import React from 'react'
import {assets} from '../assets/assets.js'

const BottomBanner = () => {
  return (
    <div className='relative mt-16 md:mt-24'>

        <img src={assets.bottom_banner_image} alt="bottom banner" className='w-full hidden md:block' />
        <img src={assets.bottom_banner_image_sm} alt="bottom banner small" className='w-full md:hidden' />
      
    </div>
  )
}

export default BottomBanner
