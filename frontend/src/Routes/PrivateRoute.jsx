import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { hasToken } from '../helper/token';

const PrivateRoute = () => {
    const auth = hasToken(); // determine if authorized, from context or however you're doing it
    return auth ? <Outlet /> : <Navigate to="/login" />;
}
export default PrivateRoute;