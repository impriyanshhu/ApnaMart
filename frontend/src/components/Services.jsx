import React from 'react'

const Services = () => {
    const services = [
        'Free Shipping',
        '24/7 Support',
        'Secure Payment',
        'Easy Returns'
    ]

    return (
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm md:text-base'>
            {services.map((item, index) => (
                <div
                    key={index}
                    className='border border-primary text-primary-dull p-5 text-center rounded-lg shadow-sm bg-primary/15'
                >
                    <p className='font-semibold'>{item}</p>
                </div>
            ))}
        </div>
    )
}

export default Services