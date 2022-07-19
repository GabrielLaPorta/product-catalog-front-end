import React from "react";

import { Outlet, Navigate} from "react-router";

const PrivateRoute = props => {
    const isLogged = !!localStorage.getItem('app-token')
    return isLogged ? <Outlet />  : <Navigate push to="/home" />;
}

export default PrivateRoute;