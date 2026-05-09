import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import { assets } from "../../assets/assets.js";
import { Link, NavLink, Outlet } from "react-router-dom";
import toast from "react-hot-toast";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

const AdminLayout = () => {

    const { axios, navigate } = useContext(AppContext);
    const [open, setOpen] = useState(false);

    const sidebarLinks = [
        { name: "Add Product", path: "/admin", icon: assets.add_icon },
        { name: "Product List", path: "/admin/product-list", icon: assets.product_list_icon },
        { name: "Orders", path: "/admin/orders", icon: assets.order_icon },
    ];

    const logout = async () => {
        try {
            const { data } = await axios.get('/api/admin/logout')
            if (data.success) {
                toast.success(data.message);
                navigate('/');
            } else toast.error(data.message)
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <>
            {/* Topbar */}
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
                <div className="flex items-center gap-3">
                    <button onClick={() => setOpen(true)} className="md:hidden text-xl">
                        <FiMenu />
                    </button>

                    <Link to="/">
                        <img className="w-28 md:w-32 h-10" src={assets.logo} />
                    </Link>
                </div>

                <div className="flex items-center gap-5 text-gray-500">
                    <p className="hidden sm:block">Hi! Admin</p>
                    <button onClick={logout} className='border rounded-full text-sm px-4 py-1 hover:text-red-500'>
                        Logout
                    </button>
                </div>
            </div>

            <div className="flex relative">

                {/* Sidebar */}
                <div className={`
                    fixed md:static top-0 left-0 h-screen md:h-[90vh] bg-white z-50
                    w-64 border-r border-gray-300 transform transition-transform duration-300
                    ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                `}>

                    {/* Close btn (mobile) */}
                    <div className="flex justify-end p-3 md:hidden">
                        <IoClose onClick={() => setOpen(false)} className="text-2xl cursor-pointer" />
                    </div>

                    {sidebarLinks.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            end={item.path === "/admin"}
                            onClick={() => setOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center py-3 px-4 gap-3 
                                ${isActive ? "bg-primary/10 text-primary border-r-4 border-primary"
                                    : "hover:bg-gray-100"}`
                            }
                        >
                            <img src={item.icon} className="w-6" />
                            <span>{item.name}</span>
                        </NavLink>
                    ))}
                </div>

                {/* Overlay */}
                {open && <div onClick={() => setOpen(false)} className="fixed inset-0 bg-black/30 md:hidden"></div>}

                {/* Content */}
                <div className="flex-1 w-full">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default AdminLayout;