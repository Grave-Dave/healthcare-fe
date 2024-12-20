import {useEffect} from "react";
import Scrollbars from "react-custom-scrollbars-2";
import {Outlet} from "react-router-dom";

import {ThemeProvider} from "@mui/material";

import theme from "./themeMaterialUi.ts";
import Header from "./components/Header/Header.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks.ts";
import actions from "./actions";
import SmoothSnackbar from "../../reusableComponents/SmoothSnackbar";
import selectors from "./selectors.ts";

const Layout = () => {
    const dispatch = useAppDispatch();

    const isLogged = useAppSelector(selectors.getIsLogged)

    useEffect(() => {
        dispatch(actions.checkAuth())
    }, [])

    useEffect(() => {
        isLogged && dispatch(actions.checkAdmin())
    }, [isLogged])

    return (
        <ThemeProvider theme={theme}>
            <Header/>
            <Scrollbars style={{
                display: 'flex',
                height: 'calc(100vh - 96px)',
                overflow: 'clip',
            }}>
                <Outlet/>
            </Scrollbars>
            <SmoothSnackbar/>
        </ThemeProvider>
    )
}

export default Layout;
