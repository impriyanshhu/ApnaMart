import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import toast from 'react-hot-toast';

const AdminLogin = () => {

    const { isAdmin, setIsAdmin, navigate, axios } = useContext(AppContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitHandler = async (event) => {
        try {
            event.preventDefault();

            const { data } = await axios.post('/api/admin/login', {email, password});

            if (data.success) {
                setIsAdmin(true);
                navigate('/admin')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (isAdmin) {
            navigate("/admin")
        }
    }, [isAdmin])

    return !isAdmin && (
        <form
            onSubmit={onSubmitHandler}
            className='min-h-screen flex items-center text-sm text-gray-600'
        >

            <div className='flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200'>
                <p className='text-2xl font-medium m-auto'><span className='text-primary'>Admin</span>Login</p>
                <div className='w-full'>
                    <p>Email</p>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Enter your Email'
                        className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary' required />
                </div>
                <div className='w-full'>
                    <p>Password</p>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Enter your Password'
                        className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary' required />
                </div>
                <button className='bg-primary text-white w-full py-2 rounded-md cursor-pointer'>Login</button>
            </div>

        </form>
    )
}

export default AdminLogin
