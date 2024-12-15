import {useState} from "react";

import {Divider} from "@mui/material";

import NavLink from "../../../../../../reusableComponents/NavLink/NavLink.tsx";
import {useStyles} from "./NavItem.style.ts";
import {NavType} from "../../types.ts";
import classNames from "classnames";

interface NavItemProps {
    navItemData: NavType
    isDropDownView: boolean
    onClick: () => void
}

const NavItem = ({navItemData, isDropDownView, onClick}: NavItemProps) => {
    const classes = useStyles()
    const [isHovered, setIsHovered] = useState<boolean>(false)

    const getNavIcon = (icon: string) => {
        return (
            <img src={icon} alt={'nav icon'} style={{
                width: "50px",
                height: "50px",
                filter: `${isHovered ? 'invert(74%) sepia(41%) saturate(1218%) hue-rotate(314deg) brightness(105%) contrast(96%)' : 'none'}`,
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
                         isHovered={isHovered}
                         href={navItemData.link}>
                    {isDropDownView && getNavIcon(navItemData.icon)}
                    {navItemData.name}
                </NavLink>
            </div>
            {isDropDownView && <Divider className={classes.divider}/>}
        </>
    )
}

export default NavItem
