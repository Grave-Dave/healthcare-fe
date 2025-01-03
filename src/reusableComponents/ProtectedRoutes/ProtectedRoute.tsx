import React, {useEffect} from "react";
import {Navigate} from "react-router-dom";

import CircularLoader from "../CircularLoader";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks.ts";
import selectors from "../../auth/selectors.ts";
import {ROUTES} from "../../constants.ts";
import {ProtectedRouteEnum} from "./constants.ts";
import layoutActions from "../../layouts/Layout/actions.tsx";
import authActions from "../../auth/actions.tsx";
import {SmoothSnackbarEnum} from "../../layouts/Layout/types.ts";

interface ProtectedRouteProps {
    children: React.ReactNode
    routeType: ProtectedRouteEnum
}

const ProtectedRoute = ({children, routeType}: ProtectedRouteProps) => {

    const dispatch = useAppDispatch();

    const isLogged = useAppSelector(selectors.getIsAuthenticated)
    const isAdmin = useAppSelector(selectors.getIsAdmin)
    const hasToken = !!useAppSelector(selectors.getAccessToken)
    const isLoading = useAppSelector(selectors.getIsLoading)

    useEffect(()=>{
        if(!isLogged && hasToken){
            displayNotification()
        }
    },[isLogged])

    const resendMail = () => {
        dispatch(authActions.resendMail())
    }

    const displayNotification = () => {
        dispatch(layoutActions.showSnackBar({
            message: 'Należy najpierw zweryfikować adres email. Link nie dotarł?',
            type: SmoothSnackbarEnum.WARNING,
            autoHideDuration: 10000,
            withButton: true,
            buttonText: 'Wyślij ponownie',
            onButtonClick: resendMail
        }))
    }

    switch (routeType) {
        case ProtectedRouteEnum.AdminRoute: {
            if (isLoading || isLogged === undefined) {
                return <CircularLoader isLoading={isLoading}/>
            }

            return isAdmin ? <>{children}</> : <Navigate to={ROUTES.HOME}/>
        }
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
