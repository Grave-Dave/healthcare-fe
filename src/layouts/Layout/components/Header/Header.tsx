import React from "react";

import {useStyles} from './Header.style';
// import useWindowSize from "../../../../hooks/useWindowSize.ts";
import HeaderTitle from "./components/HeaderTitle/HeaderTitle.tsx";
import Nav from "../Nav/Nav.tsx";
import useWindowSize from "../../../../hooks/useWindowSize.ts";
import {BREAKPOINT_NUMBERS} from "../../constants.ts";
import UserAvatar from "../../../../reusableComponents/UserAvatar";
import HeaderAvatar from "./components/HeaderAvatar";

const Header = () => {
    const classes = useStyles()
    const {windowWidth} = useWindowSize();

    const isMobile = windowWidth <= BREAKPOINT_NUMBERS.SM;

    return (
        <div className={classes.container}>
            <HeaderTitle/>
            <Nav isMobile={isMobile}/>
            <HeaderAvatar/>
        </div>
    )
}

export default React.memo(Header);
