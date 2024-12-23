import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import classNames from "classnames";

import {Divider} from "@mui/material";

import NavLink from "../../../../../../reusableComponents/NavLink/NavLink.tsx";
import {useStyles} from "./NavItem.style.ts";
import {NavType} from "../../types.ts";
import {ROUTES} from "../../../../../../constants.ts";
import {useAppDispatch} from "../../../../../../hooks/reduxHooks.ts";
import actions from "../../../../../../auth/actions.tsx";

interface NavItemProps {
    navItemData: NavType
    isDropDownView: boolean
    onClick: () => void
}

const NavItem = ({navItemData, isDropDownView, onClick}: NavItemProps) => {
    const classes = useStyles()
    const location = useLocation();
    const dispatch = useAppDispatch();

    const [isHovered, setIsHovered] = useState<boolean>(false)
    const [isActive, setIsActive] = useState<boolean>(false)

    useEffect(() => {
        if (location.pathname === navItemData.path && location.pathname !== ROUTES.HOME) {
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

    const handleClick = () => {
        if (navItemData.name === 'Wyloguj') {
            dispatch(actions.logout())
        }
        onClick()
    }

    return (
        <>
            <div className={classNames(classes.navItemContainer)}
                 onMouseEnter={() => setIsHovered(true)}
                 onMouseLeave={() => setIsHovered(false)}
                 onClick={handleClick}
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
