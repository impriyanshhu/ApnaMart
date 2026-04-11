import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <footer className="w-full bg-linear-to-b from-[#fcfeff] to-primary-dull text-gray-800 mt-24">
            <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-center">
                <div className="flex flex-col items-center space-x-3 mb-6">
                    <img alt="" className="h-11"
                        src={assets.logo} />

                    <p className='text-center max-w-xl text-base font-semibold leading-relaxed'>
                        Har Ghar ki Daily Need
                    </p>
                </div>

                <p className="text-center max-w-xl text-sm font-normal leading-relaxed">
                    Empowering every home with fresh groceries and daily essentials.
                    Making har din ki shopping easy with best quality products at the best price.
                </p>
            </div>
            <div className="border-t border-[#3B1A7A]/20 text-gray-800">
                <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm font-normal">
                    Copyright &copy; {new Date().getFullYear()}. <span className='font-semibold'>apnaMart</span> All rights reserved.
                </div>
            </div>
        </footer>
    )
}

export default Footer
