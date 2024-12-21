import {useEffect} from "react";
import Scrollbars from "react-custom-scrollbars-2";
import {Outlet} from "react-router-dom";

import {ThemeProvider} from "@mui/material";

import theme from "./themeMaterialUi.ts";
import Header from "./components/Header/Header.tsx";
import {useAppDispatch} from "../../hooks/reduxHooks.ts";
import actions from "../../auth/actions.tsx";
import SmoothSnackbar from "../../reusableComponents/SmoothSnackbar";

const Layout = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(actions.checkAuth())
    }, [])

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
