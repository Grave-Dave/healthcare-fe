import React, {useState} from "react";

import MenuIcon from '@mui/icons-material/Menu';

import {BREAKPOINT_NUMBERS} from "../../constants.ts";
import HeaderTitle from "./components/HeaderTitle";
import HeaderAvatar from "./components/HeaderAvatar";
import Nav from "../Nav";
import {useStyles} from './Header.style';
import useWindowSize from "../../../../hooks/useWindowSize.ts";
import {useAppSelector} from "../../../../hooks/reduxHooks.ts";
import selectors from "../../selectors.ts";

const Header = () => {
    const classes = useStyles()
    const {windowWidth} = useWindowSize();
    const testValue = useAppSelector(selectors.getTestValue);

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

    const isMobile = windowWidth <= BREAKPOINT_NUMBERS.MD;

    const onMenuClick = () => {
        setIsMobileMenuOpen(prevMobileMenuState => !prevMobileMenuState)
    }

    console.log(testValue)


    return (
        <div className={classes.headerContainer}>
            {isMobile && <MenuIcon sx={{height: 40, width: 40}} className={classes.burgerMenu} onClick={onMenuClick}/>}
            <HeaderTitle/>
            <Nav isMobile={isMobile} isMobileMenuOpen={isMobileMenuOpen} isUserMenuOpen={isUserMenuOpen}/>
            <HeaderAvatar
                onArrowClick={(userMenuState) => setIsUserMenuOpen(userMenuState)}
                isUserMenuOpen={isUserMenuOpen}/>
        </div>
    )
}

export default React.memo(Header);
