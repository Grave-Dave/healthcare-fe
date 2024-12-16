import {useEffect, useState} from "react";

import {Divider} from "@mui/material";

import NavLink from "../../../../../../reusableComponents/NavLink/NavLink.tsx";
import {useStyles} from "./NavItem.style.ts";
import {NavType} from "../../types.ts";
import classNames from "classnames";
import {useLocation} from "react-router-dom";

interface NavItemProps {
    navItemData: NavType
    isDropDownView: boolean
    onClick: () => void
}

const NavItem = ({navItemData, isDropDownView, onClick}: NavItemProps) => {
    const classes = useStyles()
    const location = useLocation();

    const [isHovered, setIsHovered] = useState<boolean>(false)
    const [isActive, setIsActive] = useState<boolean>(false)

    useEffect(() => {
        if (location.pathname === navItemData.path) {
            setIsActive(true)
        } else {
            setIsActive(false)
        }
    }, [location])

    const getNavIcon = (icon: string) => {
        return (
            <img src={icon} alt={'nav icon'} style={{
                width: "50px",
                height: "50px",
                filter: `${(isHovered || isActive) ? 'invert(74%) sepia(41%) saturate(1218%) hue-rotate(314deg) brightness(105%) contrast(96%)' : 'none'}`,
            }}/>
        )
    }

    return (
        <>
            <div className={classNames(classes.navItemContainer, {[classes.dropDownItemContainer]: isDropDownView})}
                 onMouseEnter={() => setIsHovered(true)}
                 onMouseLeave={() => setIsHovered(false)}
                 onClick={onClick}
            >
                <NavLink isMobile={isDropDownView}
                         isHovered={isHovered || isActive}
                         href={navItemData.path}>
                    {isDropDownView && getNavIcon(navItemData.icon)}
                    {navItemData.name}
                </NavLink>
            </div>
            {isDropDownView && <Divider className={classes.divider}/>}
        </>
    )
}

export default NavItem
