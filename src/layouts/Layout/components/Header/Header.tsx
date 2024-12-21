import React from "react";

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
import {ClickAwayListener} from "@mui/material";

const Header = () => {
    const classes = useStyles()
    const dispatch = useAppDispatch();
    const {windowWidth} = useWindowSize();

    const isUserMenuOpen = useAppSelector(selectors.getIsUserMenuOpen);
    const isMobileMenuOpen = useAppSelector(selectors.getIsMobileMenuOpen);
    const isLoading = useAppSelector(authSelectors.getIsLoading);

    const isMobile = windowWidth <= BREAKPOINT_NUMBERS.MD;

    const onMenuClick = () => {
        dispatch(actions.setMobileMenuOpen(!isMobileMenuOpen))
    }

    const onUserArrowClick = () => {
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
            <div className={classes.headerContainer}>
                {isMobile &&
                    <MenuIcon sx={{height: 40, width: 40}} className={classes.burgerMenu} onClick={onMenuClick}/>}
                <HeaderTitle/>
                <Nav isMobile={isMobile} isMobileMenuOpen={isMobileMenuOpen} isUserMenuOpen={isUserMenuOpen}/>
                <HeaderAvatar onArrowClick={onUserArrowClick} isUserMenuOpen={isUserMenuOpen} isLoading={isLoading}/>
            </div>
        </ClickAwayListener>
    )
}

export default React.memo(Header);
