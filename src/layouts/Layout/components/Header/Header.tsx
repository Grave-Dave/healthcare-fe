import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import classNames from "classnames";

import {ClickAwayListener} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

import {BREAKPOINT_NUMBERS} from "../../constants.ts";
import HeaderTitle from "./components/HeaderTitle";
import HeaderAvatar from "./components/HeaderAvatar";
import Nav from "../Nav";
import {useStyles} from './Header.style';
import useWindowSize from "../../../../hooks/useWindowSize.ts";
import {useAppDispatch, useAppSelector} from "../../../../hooks/reduxHooks.ts";
import authSelectors from "../../../../auth/selectors.ts";
import selectors from "../../selectors.ts";
import actions from "../../actions.tsx";
import {ROUTES} from "../../../../constants.ts";

const Header = () => {
    const classes = useStyles()
    const dispatch = useAppDispatch();
    const {windowWidth} = useWindowSize();
    const location = useLocation();

    const [isHomePage, setIsHomePage] = useState(true)

    const isUserMenuOpen = useAppSelector(selectors.getIsUserMenuOpen);
    const isMobileMenuOpen = useAppSelector(selectors.getIsMobileMenuOpen);
    const isLoading = useAppSelector(authSelectors.getIsLoading);

    const isMobile = windowWidth <= BREAKPOINT_NUMBERS.MD;

    useEffect(() => {
        if (location.pathname === ROUTES.HOME) {
            setIsHomePage(true)
        } else {
            setIsHomePage(false)
        }
    }, [location.pathname])

    const onMenuClick = () => {
        dispatch(actions.setMobileMenuOpen(!isMobileMenuOpen))
    }

    const onUserMenuClick = () => {
        !isLoading && dispatch(actions.setUserMenuOpen(!isUserMenuOpen))
    }

    const onClickAwayHeader = () => {
        if (isMobileMenuOpen || isUserMenuOpen) {
            dispatch(actions.setMobileMenuOpen(false))
            dispatch(actions.setUserMenuOpen(false))
        }
    }

    return (
        <ClickAwayListener onClickAway={onClickAwayHeader}>
            <div style={{position: isHomePage ? "fixed" : "sticky"}}
                 className={classNames(classes.headerContainer,
                     {[classes.headerHomeBackground]: isHomePage && !isUserMenuOpen && !isMobileMenuOpen})}>
                {isMobile &&
                    <MenuIcon sx={{height: 40, width: 40}} className={classes.burgerMenu} onClick={onMenuClick}/>}
                <HeaderTitle/>
                <Nav isMobile={isMobile} isMobileMenuOpen={isMobileMenuOpen} isUserMenuOpen={isUserMenuOpen}/>
                <HeaderAvatar onUserMenuClick={onUserMenuClick} isUserMenuOpen={isUserMenuOpen} isLoading={isLoading}/>
            </div>
        </ClickAwayListener>
    )
}

export default React.memo(Header);
