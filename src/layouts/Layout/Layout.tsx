import {useEffect, useState} from "react";
import Scrollbars from "react-custom-scrollbars-2";
import {Outlet, useLocation} from "react-router-dom";

import {ThemeProvider} from "@mui/material";

import theme from "./themeMaterialUi.ts";
import Header from "./components/Header/Header.tsx";
import {useAppDispatch} from "../../hooks/reduxHooks.ts";
import actions from "../../auth/actions.tsx";
import SmoothSnackbarRoot from "../../reusableComponents/SmoothSnackbar/SmoothSnackBarRoot";
import Home from "../../containers/Home";
import {getHomePageWrapperStyle, getOutletWrapperStyle} from "./utils/utils.ts";
import {ROUTES} from "../../constants.ts";

const Layout = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();

    const [isHomePage, setIsHomePage] = useState(true)

    useEffect(() => {
        dispatch(actions.checkAuth())
    }, [])

    useEffect(() => {
        if (location.pathname === ROUTES.HOME) {
            setIsHomePage(true)
        } else {
            setIsHomePage(false)
        }
    }, [location.pathname])

    const getPageContent = () => {
        switch (true) {
            case isHomePage: {
                return (
                    <div style={getHomePageWrapperStyle()}>
                        <Home/>
                    </div>
                )
            }
            default:
                return (
                    <Scrollbars style={getOutletWrapperStyle()}>
                        <Outlet/>
                    </Scrollbars>
                )
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Header/>
            {getPageContent()}
            <SmoothSnackbarRoot/>
        </ThemeProvider>
    )
}

export default Layout;
