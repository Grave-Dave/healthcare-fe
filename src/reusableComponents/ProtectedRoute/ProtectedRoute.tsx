import React from "react";
import {Navigate} from "react-router-dom";

import CircularLoader from "../CircularLoader";
import {useAppSelector} from "../../hooks/reduxHooks.ts";
import selectors from "../../auth/selectors.ts";
import {ROUTES} from "../../constants.ts";

interface ProtectedRouteProps {
    children: React.ReactNode
}

const ProtectedRoute = ({children}: ProtectedRouteProps) => {

    const isLogged = useAppSelector(selectors.getIsAuthenticated)
    const isLoading = useAppSelector(selectors.getIsLoading)

    if (isLoading || isLogged === undefined) {
        return <CircularLoader isLoading={isLoading}/>
    }

    return isLogged ? <>{children}</> : <Navigate to={ROUTES.LOGIN}/>
}

export default ProtectedRoute;
