import React from "react";

import MenuIcon from '@mui/icons-material/Menu';

import {BREAKPOINT_NUMBERS} from "../../constants.ts";
import HeaderTitle from "./components/HeaderTitle";
import HeaderAvatar from "./components/HeaderAvatar";
import Nav from "../Nav";
import {useStyles} from './Header.style';
import useWindowSize from "../../../../hooks/useWindowSize.ts";
import {useAppDispatch, useAppSelector} from "../../../../hooks/reduxHooks.ts";
import selectors from "../../selectors.ts";
import actions from "../../actions.tsx";

const Header = () => {
    const classes = useStyles()
    const dispatch = useAppDispatch();
    const {windowWidth} = useWindowSize();

    const isUserMenuOpen = useAppSelector(selectors.getIsUserMenuOpen);
    const isMobileMenuOpen = useAppSelector(selectors.getIsMobileMenuOpen);

    const isMobile = windowWidth <= BREAKPOINT_NUMBERS.MD;

    const onMenuClick = () => {
        dispatch(actions.setMobileMenuOpen(!isMobileMenuOpen))
    }

    const onUserArrowClick = () => {
        dispatch(actions.setUserMenuOpen(!isUserMenuOpen))
    }

    return (
        <div className={classes.headerContainer}>
            {isMobile && <MenuIcon sx={{height: 40, width: 40}} className={classes.burgerMenu} onClick={onMenuClick}/>}
            <HeaderTitle/>
            <Nav isMobile={isMobile} isMobileMenuOpen={isMobileMenuOpen} isUserMenuOpen={isUserMenuOpen}/>
            <HeaderAvatar onArrowClick={onUserArrowClick} isUserMenuOpen={isUserMenuOpen}/>
        </div>
    )
}

export default React.memo(Header);
