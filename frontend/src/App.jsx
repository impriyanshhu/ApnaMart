import React, { useContext } from 'react'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer.jsx'
import AllProducts from './pages/AllProducts.jsx'
import ProductCategory from './pages/ProductCategory.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import { AppContext } from './context/AppContext.jsx'
import Login from './components/Login.jsx'
import Cart from './pages/Cart.jsx'
import AddAddress from './pages/AddAddress.jsx'
import MyOrders from './pages/MyOrders.jsx'
import AdminLogin from './components/admin/AdminLogin.jsx'
import AdminLayout from './pages/admin/AdminLayout.jsx'
import AddProduct from './pages/admin/AddProduct.jsx'
import ProductList from './pages/admin/ProductList.jsx'
import Orders from './pages/admin/Orders.jsx'

const App = () => {

  const isAdminPath = useLocation().pathname.includes("admin");
  const { showUserLogin, isAdmin } = useContext(AppContext)

  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>

      <Toaster />
      {!isAdminPath && <Navbar />}
      {showUserLogin ? <Login /> : null}

      <div className={` ${isAdminPath ? '' : 'px-6 md:px-14 lg:px-16 xl:px-20'}`}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<AllProducts />} />
          <Route path='/products/:category' element={<ProductCategory />} />
          <Route path='/products/:category/:id' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/add-address' element={<AddAddress />} />
          <Route path='/my-orders' element={<MyOrders />} />
          <Route path='/admin' element={isAdmin ? <AdminLayout /> : <AdminLogin />}>
            <Route index element={isAdmin ? <AddProduct /> : null} />
            <Route path='product-list' element={<ProductList />} />
            <Route path='orders' element={<Orders />} />
          </Route>
        </Routes>
      </div>

      {!isAdminPath && <Footer />}

    </div>
  )
}

export default App
