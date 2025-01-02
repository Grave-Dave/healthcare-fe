import {useEffect, useState} from "react";
import Scrollbars from "react-custom-scrollbars-2";
import {Outlet, useLocation} from "react-router-dom";

import {ThemeProvider} from "@mui/material";

import theme from "./themeMaterialUi.ts";
import Header from "./components/Header/Header.tsx";
import {useAppDispatch} from "../../hooks/reduxHooks.ts";
import actions from "../../auth/actions.tsx";
import SmoothSnackbar from "../../reusableComponents/SmoothSnackbar";
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

    return (
        <ThemeProvider theme={theme}>
            <Header/>
            <Scrollbars style={{
                position: isHomePage ? 'absolute' : 'relative',
                top: isHomePage ? 0 : 'auto',
                display: 'flex',
                height: isHomePage ? '100vh' : 'calc(100vh - 96px)',
                overflow: 'clip',
            }}>
                <Outlet/>
            </Scrollbars>
            <SmoothSnackbar/>
        </ThemeProvider>
    )
}

export default Layout;
