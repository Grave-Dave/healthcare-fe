import React from "react";
import {Link} from "react-router-dom";
import {WithStyles, withStyles} from "@mui/styles";
import {styles} from "./NavLink.style";

interface NavLinkProps extends WithStyles<typeof styles> {
    children: React.ReactNode,
    href: string,
}

const NavLink = ({children, href, classes, ...otherProps}: NavLinkProps) => {

    return (
        <Link
            to={href}
            className={classes.navLink}
            {...otherProps}>
            {children}
        </Link>
    )
}

export default withStyles(styles)(NavLink);
