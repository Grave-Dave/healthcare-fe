import Scrollbars from "react-custom-scrollbars-2";
import {Outlet} from "react-router-dom";

import {ThemeProvider} from "@mui/material";

import theme from "./themeMaterialUi.ts";
import Header from "./components/Header/Header.tsx";

const Layout = () => {

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
        </ThemeProvider>
    )
}

export default Layout;
