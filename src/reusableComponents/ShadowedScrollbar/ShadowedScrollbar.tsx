import React from "react";
import classNames from "classnames";
import Scrollbars from "react-custom-scrollbars-2";

import {withStyles, WithStyles} from "@mui/styles";

import {styles} from "./ShadowedScrollbar.style.ts";
import {BREAKPOINT_NUMBERS} from "../../layouts/Layout/constants.ts";
import useWindowSize from "../../hooks/useWindowSize.ts";

interface ShadowedScrollbarProps extends WithStyles<typeof styles> {
    children: React.ReactNode,
    style?: React.CSSProperties
}

const ShadowedScrollbar = ({children, style, classes, ...otherProps}: ShadowedScrollbarProps) => {
    const {windowWidth} = useWindowSize();
    const isMobile = windowWidth <= BREAKPOINT_NUMBERS.MD;

    return (
        <Scrollbars
            style={style}
            renderView={({style: originalStyle}) =>
                <div style={{...originalStyle}} className={classNames(classes.shadowedScrollBar, {[classes.mobile]: isMobile})}/>}
            {...otherProps}
        >
            {children}
        </Scrollbars>
    )
}

export default withStyles(styles)(ShadowedScrollbar);
