import React from "react";
import {Navigate} from "react-router-dom";

import CircularLoader from "../CircularLoader";
import {useAppSelector} from "../../hooks/reduxHooks.ts";
import selectors from "../../auth/selectors.ts";
import {ROUTES} from "../../constants.ts";
import {ProtectedRouteEnum} from "./types.ts";

interface ProtectedRouteProps {
    children: React.ReactNode
    routeType: ProtectedRouteEnum
}

const ProtectedRoute = ({children, routeType}: ProtectedRouteProps) => {

    const isLogged = useAppSelector(selectors.getIsAuthenticated)
    const isLoading = useAppSelector(selectors.getIsLoading)


    switch (routeType) {
        case ProtectedRouteEnum.AuthRoute: {
            if (isLoading || isLogged === undefined) {
                return <CircularLoader isLoading={isLoading}/>
            }
            return isLogged ? <>{children}</> : <Navigate to={ROUTES.LOGIN}/>
        }
        case ProtectedRouteEnum.GuestRoute: {
            return isLogged ? <Navigate to={ROUTES.HOME}/> : <>{children}</>
        }
    }
}

export default ProtectedRoute;
