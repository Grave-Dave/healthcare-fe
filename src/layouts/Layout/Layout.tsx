import {useEffect, useState, CSSProperties} from "react";
import Scrollbars from "react-custom-scrollbars-2";
import {Outlet, useLocation} from "react-router-dom";

import {ThemeProvider} from "@mui/material";

import theme from "./themeMaterialUi.ts";
import Header from "./components/Header/Header.tsx";
import {useAppDispatch} from "../../hooks/reduxHooks.ts";
import actions from "../../auth/actions.tsx";
import SmoothSnackbarRoot from "../../reusableComponents/SmoothSnackbar/SmoothSnackBarRoot";
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

    const getOutletWrapperStyle = (): CSSProperties => {
        switch (true) {
            case isHomePage: {
                return {
                    position: 'absolute',
                    top: 0,
                    display: 'flex',
                    height: '100%',
                    overflow: 'clip',
                }
            }
            default:
                return {
                    position: 'relative',
                    top: 'auto',
                    display: 'flex',
                    height: 'calc(100vh - 96px)',
                    overflow: 'clip',
                }
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Header/>
            <Scrollbars style={getOutletWrapperStyle()}>
                <Outlet/>
            </Scrollbars>
            <SmoothSnackbarRoot/>
        </ThemeProvider>
    )
}

export default Layout;
