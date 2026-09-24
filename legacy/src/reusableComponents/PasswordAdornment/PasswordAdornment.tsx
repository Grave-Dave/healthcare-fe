import React from "react";
import classNames from "classnames";

import {WithStyles, withStyles} from "@mui/styles";
import {IconButton, InputAdornment} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

import {styles} from "../MyPaper/MyPaper.style.ts";

interface PasswordAdornmentProps extends WithStyles<typeof styles> {
    adornmentClassName?: string,
    onClick: () => void
    showPassword: boolean
}

const PasswordAdornment = ({onClick, adornmentClassName, showPassword, classes}: PasswordAdornmentProps) => {

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <InputAdornment position="end">
            <IconButton
                className={classNames(adornmentClassName, classes)}
                onClick={onClick}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                edge="end"
            >
                {showPassword ? <VisibilityOff/> : <Visibility/>}
            </IconButton>
        </InputAdornment>
    )
}

export default withStyles(styles)(PasswordAdornment);
