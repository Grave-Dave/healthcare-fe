import {useState, useEffect} from "react";
import classNames from "classnames";
import {NavType} from "./types.ts";
import NavLink from "../../../../reusableComponents/NavLink";
import {adminNav, defaultNav} from "./constants.ts";
import {useStyles} from "./Nav.style.ts";

interface NavProps {
    isMobile: boolean
}

const Nav = ({isMobile = false}: NavProps) => {
    const classes = useStyles()
    const [navItemsData, setNavItemsData] = useState<NavType[]>([])
    const isAdmin = undefined

    useEffect(() => {
        if (isAdmin)
            setNavItemsData(adminNav)
        else {
            setNavItemsData(defaultNav)
        }
    }, [isAdmin])

    const navItems = navItemsData.map(navItemData => (
        <NavLink href={navItemData.link}>{navItemData.name}</NavLink>
    ))


    return (
        <div className={classNames(classes.navContainer, {[classes.navMobileContainer]: isMobile})}>
            {navItems}
        </div>
    )
}

export default Nav
