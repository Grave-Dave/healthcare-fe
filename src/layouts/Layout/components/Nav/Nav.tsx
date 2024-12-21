import {useState, useEffect} from "react";
import classNames from "classnames";

import {NavType} from "./types.ts";
import {adminNav, defaultNav, loginItem, userItems} from "./constants.ts";
import {useStyles} from "./Nav.style.ts";
import NavItem from "./components/NavItem";
import {useAppDispatch, useAppSelector} from "../../../../hooks/reduxHooks.ts";
import actions from "../../actions.tsx";
import selectors from "../../../../auth/selectors.ts";

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

    const isAdmin = useAppSelector(selectors.getIsAdmin)
    const isLogged = useAppSelector(selectors.getIsAuthenticated)

    useEffect(() => {

        switch (true) {
            case isAdmin: {
                setNavItemsData(adminNav)
                setUserMenuData(userItems)
            }
                break;
            case isLogged: {
                setNavItemsData(defaultNav)
                setUserMenuData(userItems)
            }
                break;
            default: {
                setNavItemsData(defaultNav)
                setUserMenuData(loginItem)
            }
                break;
        }

    }, [isAdmin, isLogged])

    const onNavItemClick = () => {
        dispatch(actions.setMobileMenuOpen(false))
    }
    const onUserItemClick = () => {
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
