import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { useLocation } from "react-router-dom";

const LoadingSpinner = ({ size = 36 }) => {

    const { navigate } = useContext(AppContext);

    let { search } = useLocation();
    const query = new URLSearchParams(search);
    const nextUrl = query.get('next');

    useEffect(() => {
        if (nextUrl) {
            setTimeout(() => {
                navigate(`/${nextUrl}`)
            }, 5000)
        }
    }, [nextUrl])

    return (
        <div className="flex items-center justify-center py-4">
            <div
                className="border-4 border-gray-300 border-t-primary-dull rounded-full animate-spin"
                style={{ width: size, height: size }}
            />
        </div>
    );
};

export default LoadingSpinner;