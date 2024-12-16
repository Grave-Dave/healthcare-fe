import React from "react";
import Scrollbars from "react-custom-scrollbars-2";

import {withStyles, WithStyles} from "@mui/styles";

import {styles} from "./ShadowedScrollbar.style.ts";

interface ShadowedScrollbarProps extends WithStyles<typeof styles> {
    children: React.ReactNode,
    style?: React.CSSProperties
}

const ShadowedScrollbar = ({children, style, classes, ...otherProps}: ShadowedScrollbarProps) => {
    return (
        <Scrollbars
            style={style}
            renderView={({style: originalStyle}) =>
                <div style={{...originalStyle}} className={classes.shadowedScrollBar}/>}
            {...otherProps}
        >
            {children}
        </Scrollbars>
    )
}

export default withStyles(styles)(ShadowedScrollbar);
