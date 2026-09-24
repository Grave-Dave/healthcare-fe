import React from "react";
import {Link} from "react-router-dom";
import classNames from "classnames";

import {WithStyles, withStyles} from "@mui/styles";

import {styles} from "./NavLink.style";

interface NavLinkProps extends WithStyles<typeof styles> {
    children: React.ReactNode,
    href: string,
    navLinkClassName?: string,
    disabled?: boolean,
    isMobile?: boolean,
    isHovered?: boolean
}

const NavLink = ({children, href, classes, navLinkClassName, disabled = false, isMobile = false, isHovered = false, ...otherProps}: NavLinkProps) => {

    return (
        <Link
            to={href}
            className={classNames(`${classes.navLink} ${navLinkClassName ?? ''}`, {
                [classes.hovered]: isHovered,
                [classes.mobileLink]: isMobile,
                [classes.disabled]: disabled
            })}
            {...otherProps}>
            {children}
        </Link>
    )
}

export default withStyles(styles)(NavLink);
