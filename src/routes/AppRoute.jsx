import React, { useContext, useEffect } from 'react'

import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { usuarioContext } from '../context/usuarioContext';

import Login from '../pages/auth/login';
import Register from '../pages/auth/register';
import Home from '../pages/home';
import Suscription from '../pages/suscription';
import RouteAuth from './RouteAuth';
import RoutePrivate from './RoutePrivate';
import { extractToken } from '../helpers/helper';
import DetailsLibro from '../pages/libro/DetailsLibro';
import CreateLibro from '../pages/libro/CreateLibro';
import LibroList from '../pages/libro/LibroList';
import CategoriaTable from '../pages/categoria/CategoriaTable';
import LibroTable from '../pages/libro/LibroTable';

const AppRoute = () => {

    const { state, setContext } = useContext(usuarioContext);
    const { isAuthenticated } = state;

    function getToken() {
        let json = extractToken();
        if (json == null) return;
        setContext({
            ...json
        });
    }

    useEffect(() => {
        getToken();
    }, []);

    return (
        <Router>
            <Routes>

                {/* Routes Authentications */}
                <Route path={'/auth'} element={
                    <RouteAuth isAuthenticated={isAuthenticated} />
                }>
                    <Route path={'login'} element={<Login />} />
                    <Route path={'register'} element={<Register />} />
                </Route>

                {/* Routes Private */}
                <Route element={<RoutePrivate isAuthenticated={isAuthenticated} />}>
                    <Route path={"/suscription"} element={<Suscription />} />
                </Route>

                {/* Routes Publics */}
                <Route path={'/'} element={<Home />} />
                <Route path='libro' element={<LibroList/>} />
                <Route path='libro/:id' element={<DetailsLibro />} />
                <Route path='libro/create' element={<CreateLibro />} />
                <Route path='admin/categoria' element={<CategoriaTable />} />
                <Route path='admin/libro' element={<LibroTable />}/>
            </Routes>
        </Router >
    )
}

export default AppRoute