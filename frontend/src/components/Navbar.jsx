import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets.js'
import { NavLink } from 'react-router-dom'
import { AppContext } from '../context/AppContext.jsx';

const Navbar = () => {

    const [open, setOpen] = useState(false);
    const { user, setUser, setShowUserLogin, navigate, searchQuery, setSearchQuery, getCartCount } = useContext(AppContext);

    useEffect(() => {
        if (searchQuery.length > 0) {
            navigate('/products')
        }
    }, [searchQuery])

    const logout = async () => {
        setUser(null);
        navigate('/');
    }

    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-2 border-b border-gray-300 bg-white relative transition-all shadow-md">

            <NavLink to={'/'} onClick={() => setOpen(false)} className='w-auto h-10'>
                <img src={assets.logo} alt="" className='object-contain w-full h-full' />
            </NavLink>

            <div className="hidden sm:flex items-center gap-8 text-lg">
                <NavLink
                    to='/'
                    className={({ isActive }) =>
                        isActive
                            ? "text-primary font-semibold"
                            : "text-gray-500 hover:text-primary-dull"
                    }>
                    Home
                </NavLink>
                <NavLink
                    to='/products'
                    className={({ isActive }) =>
                        isActive
                            ? "text-primary font-semibold"
                            : "text-gray-500 hover:text-primary-dull"
                    }>
                    All Product
                </NavLink>
                <NavLink
                    to='/contact'
                    className={({ isActive }) =>
                        isActive
                            ? "text-primary font-semibold"
                            : "text-gray-500 hover:text-primary-dull"
                    }>
                    Contact
                </NavLink>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input onChange={(e) => setSearchQuery(e.target.value)} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                    <img src={assets.search_icon} alt="search" className='w-4 h-4' />
                </div>

                <div onClick={() => navigate('/cart')} className="relative cursor-pointer">
                    <img src={assets.nav_cart_icon} alt="cart" className='w-6 opacity-80' />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-4.5 h-4.5 rounded-full">{getCartCount()}</button>
                </div>

                {
                    !user ?
                        (
                            <button
                                className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full"
                                onClick={() => { setShowUserLogin(true) }}
                            >
                                Login
                            </button>
                        ) :
                        (
                            <div className='relative group'>
                                <img src={assets.profile_icon} alt="profile" className='w-10' />
                                <ul className='hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40'>
                                    <li onClick={() => { navigate('my-orders') }} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>My Orders</li>
                                    <li onClick={logout} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>Logout</li>
                                </ul>
                            </div>
                        )
                }

            </div>

            <div className='flex items-center gap-6 sm:hidden'>
                <div onClick={() => navigate('/cart')} className="relative cursor-pointer">
                    <img src={assets.nav_cart_icon} alt="cart" className='w-6 opacity-80' />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-4.5 h-4.5 rounded-full">{getCartCount()}</button>
                </div>
                <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                    {/* Menu Icon SVG */}
                    <img src={assets.menu_icon} alt="menu" />
                </button>
            </div>



            {/* Mobile Menu */}

            {open && (
                <div className={`${open ? 'flex' : 'hidden'} absolute top-15 z-40 left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-base md:hidden`}>

                    <NavLink to='/' onClick={() => setOpen(false)} className="block">Home</NavLink>
                    <NavLink to='/products' onClick={() => setOpen(false)} className="block">All Product</NavLink>

                    {user &&
                        <NavLink
                            to='my-orders'
                            onClick={() => setOpen(false)}
                            className="block">
                            My Orders
                        </NavLink>
                    }

                    <NavLink to='/contact' onClick={() => setOpen(false)} className="block">Contact</NavLink>

                    {!user ?
                        (<button
                            onClick={() => {
                                setOpen(false);
                                setShowUserLogin(false);
                            }}
                            className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                            Login
                        </button>) :
                        (<button
                            onClick={() => {
                                logout
                            }}
                            className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                            Logout
                        </button>)
                    }
                </div>
            )}

        </nav>
    )
}

export default Navbar
