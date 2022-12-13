import React from 'react'
import { Navigate, Outlet, } from 'react-router-dom';

const RoutePrivate = (props) => {

    const { isAuthenticated } = props;

    if (isAuthenticated) {
        return <Outlet />
    }

    return <Navigate to={"/auth/login"} />
}

export default RoutePrivate