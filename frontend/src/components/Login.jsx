import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Login = () => {

    // login | register | forgot-password | reset-password
    const [state, setState] = useState("login");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [otp, setOtp] = useState("");

    const { axios, setShowUserLogin, setUser, navigate} = useContext(AppContext);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {

            // ================= LOGIN =================
            if (state === "login") {

                const { data } = await axios.post(
                    "/api/user/login",
                    { email, password }
                );

                if (data.success) {

                    setUser(data.user);
                    navigate('/');
                    setShowUserLogin(false);

                    toast.success(data.message);

                } else {
                    toast.error(data.message);
                }
            }

            // ================= REGISTER =================
            else if (state === "register") {

                const { data } = await axios.post(
                    "/api/user/register",
                    { name, email, password }
                );

                if (data.success) {

                    setUser(data.user);
                    navigate('/');
                    setShowUserLogin(false);

                    toast.success(data.message);

                } else {
                    toast.error(data.message);
                }
            }

            // ================= SEND OTP =================
            else if (state === "forgot-password") {

                const { data } = await axios.post(
                    "/api/user/send-reset-otp",
                    { email }
                );

                if (data.success) {

                    toast.success(data.message);

                    // Move to reset password form
                    setState("reset-password");

                } else {
                    toast.error(data.message);
                }
            }

            // ================= RESET PASSWORD =================
            else if (state === "reset-password") {

                // Password match validation
                if (password !== confirmPassword) {
                    return toast.error("Passwords do not match");
                }

                const { data } = await axios.post(
                    "/api/user/reset-password",
                    {
                        email,
                        otp,
                        password
                    }
                );

                if (data.success) {

                    toast.success(data.message);

                    // Back to login page
                    setState("login");

                    // Clear fields
                    setOtp("");
                    setPassword("");
                    setConfirmPassword("");

                } else {
                    toast.error(data.message);
                }
            }

        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    }

    return (
        <div
            onClick={() => setShowUserLogin(false)}
            className='fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center justify-center bg-black/50'
        >

            <form
                onSubmit={onSubmitHandler}
                onClick={(e) => e.stopPropagation()}
                className='flex flex-col gap-4 m-auto w-80 sm:w-88 bg-white p-8 rounded-xl shadow-xl text-sm'
            >

                {/* Heading */}
                <div className='text-center'>
                    <h2 className='text-2xl font-semibold text-gray-800'>
                        <span className='text-primary'>User </span>

                        {
                            state === "login"
                                ? "Login"
                                : state === "register"
                                    ? "Sign Up"
                                    : state === "forgot-password"
                                        ? "Forgot Password"
                                        : "Reset Password"
                        }
                    </h2>
                </div>

                {/* Register Name */}
                {state === "register" && (
                    <div>
                        <p className='text-gray-600 mb-1'>Name</p>

                        <input
                            type="text"
                            placeholder='Enter your name'
                            className='w-full border border-gray-300 rounded-md p-2 outline-primary'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                )}

                {/* Email */}
                {(state === "login" ||
                    state === "register" ||
                    state === "forgot-password") && (
                        <div>
                            <p className='text-gray-600 mb-1'>Email</p>

                            <input
                                type="email"
                                placeholder='Enter your email'
                                className='w-full border border-gray-300 rounded-md p-2 outline-primary'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    )}

                {/* Password */}
                {(state === "login" || state === "register") && (
                    <div>
                        <p className='text-gray-600 mb-1'>Password</p>

                        <input
                            type="password"
                            placeholder='Enter your password'
                            className='w-full border border-gray-300 rounded-md p-2 outline-primary'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        {/* Forgot Password */}
                        {state === "login" && (
                            <p
                                onClick={() => setState("forgot-password")}
                                className='text-primary text-right mt-1 cursor-pointer'
                            >
                                Forgot Password?
                            </p>
                        )}
                    </div>
                )}

                {/* Reset Password Form */}
                {state === "reset-password" && (
                    <>
                        {/* OTP */}
                        <div>
                            <p className='text-gray-600 mb-1'>OTP sent to {email}</p>

                            <input
                                type="text"
                                placeholder='Enter OTP'
                                className='w-full border border-gray-300 rounded-md p-2 outline-primary'
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />
                        </div>

                        {/* New Password */}
                        <div>
                            <p className='text-gray-600 mb-1'>New Password</p>

                            <input
                                type="password"
                                placeholder='Enter new password'
                                className='w-full border border-gray-300 rounded-md p-2 outline-primary'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <p className='text-gray-600 mb-1'>Confirm Password</p>

                            <input
                                type="password"
                                placeholder='Confirm new password'
                                className='w-full border border-gray-300 rounded-md p-2 outline-primary'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    </>
                )}

                {/* Bottom Text */}
                {
                    state === "login" && (
                        <p className='text-gray-600'>
                            Create an account?{" "}
                            <span
                                onClick={() => setState("register")}
                                className='text-primary cursor-pointer'
                            >
                                Click here
                            </span>
                        </p>
                    )
                }

                {
                    state === "register" && (
                        <p className='text-gray-600'>
                            Already have an account?{" "}
                            <span
                                onClick={() => setState("login")}
                                className='text-primary cursor-pointer'
                            >
                                Login
                            </span>
                        </p>
                    )
                }

                {/* Button */}
                <button className='bg-primary hover:bg-primary-dull transition-all text-white py-2 rounded-md cursor-pointer'>

                    {
                        state === "login"
                            ? "Login"
                            : state === "register"
                                ? "Create Account"
                                : state === "forgot-password"
                                    ? "Send OTP"
                                    : "Reset Password"
                    }

                </button>

                {
                    (state === "forgot-password" ||
                        state === "reset-password") && (
                        <p className='text-gray-600'>
                            Back to{" "}
                            <span
                                onClick={() => setState("login")}
                                className='text-primary cursor-pointer'
                            >
                                Login
                            </span>
                        </p>
                    )
                }

            </form>

        </div>
    )
}

export default Login;