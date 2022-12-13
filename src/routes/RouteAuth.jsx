import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const RouteAuth = (props) => {
    const { isAuthenticated } = props;
    if (isAuthenticated) {
        return <Navigate to="/" />
    }
    return <Outlet />
}

export default RouteAuth