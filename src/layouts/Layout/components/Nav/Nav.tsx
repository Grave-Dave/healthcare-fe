import {useState, useEffect} from "react";
import classNames from "classnames";

import {NavType} from "./types.ts";
import {adminNav, defaultNav, loginItem, userItems} from "./constants.ts";
import {useStyles} from "./Nav.style.ts";
import NavItem from "./components/NavItem";
import {useAppDispatch} from "../../../../hooks/reduxHooks.ts";
import actions from "../../actions.tsx";

interface NavProps {
    isMobile: boolean;
    isMobileMenuOpen: boolean;
    isUserMenuOpen: boolean
}

const Nav = ({isMobile, isMobileMenuOpen, isUserMenuOpen}: NavProps) => {
    const classes = useStyles()
    const dispatch = useAppDispatch();

    const [navItemsData, setNavItemsData] = useState<NavType[]>([])
    const [userMenuData, setUserMenuData] = useState<NavType[]>([])
    const isAdmin = undefined
    const isLogged = false

    useEffect(() => {
        if (isAdmin) {
            setNavItemsData(adminNav)
            setUserMenuData(userItems)
        } else if (isLogged) {
            setNavItemsData(defaultNav)
            setUserMenuData(userItems)
        } else {
            setNavItemsData(defaultNav)
            setUserMenuData(loginItem)
        }
    }, [isAdmin])

    const onNavItemClick = () =>{
        dispatch(actions.setMobileMenuOpen(false))
    }
    const onUserItemClick = () =>{
        dispatch(actions.setUserMenuOpen(false))
    }

    const navItems = navItemsData.map((navItemData, i) => (
        <NavItem key={`navItem-${i}`} navItemData={navItemData} isDropDownView={isMobile} onClick={onNavItemClick}/>
    ))

    const menuItems = userMenuData.map((navItemData, i) => (
        <NavItem key={`userMenuItem-${i}`} navItemData={navItemData} isDropDownView onClick={onUserItemClick}/>
    ))

    return (
        <>
            <div className={classNames(classes.navContainer, {
                [classes.navMobileContainer]: isMobile,
                [classes.navMobileOpen]: isMobile && isMobileMenuOpen
            })}>
                {navItems}
            </div>
            <div style={{height: `${100 * menuItems.length}px`}} className={classNames(classes.userMenuContainer, {
                [classes.userMenuOpen]: isUserMenuOpen
            })}>
                {menuItems}
            </div>
        </>
    )
}

export default Nav
