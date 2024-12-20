import {Navigate, Outlet} from "react-router-dom";
import CircularLoader from "../CircularLoader";
import {useAppSelector} from "../../hooks/reduxHooks.ts";
import selectors from "../../layouts/Layout/selectors.ts";
import {ROUTES} from "../../constants.ts";

interface ProtectedRouteProps {

}

const ProtectedRoute = ({}: ProtectedRouteProps) => {

    const isLogged = useAppSelector(selectors.getIsLogged)
    const isLoading = useAppSelector(selectors.getIsLoading)

    if (isLoading) {
        return <CircularLoader isLoading={isLoading}/>
    }

    return isLogged ? <Outlet/> : <Navigate to={ROUTES.LOGIN}/>
}

export default ProtectedRoute;
