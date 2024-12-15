import classNames from "classnames";

import {Paper} from "@mui/material";
import {WithStyles, withStyles} from "@mui/styles";

import {styles} from "./MyPaper.style.ts";
import React from "react";
import useWindowSize from "../../hooks/useWindowSize.ts";
import {BREAKPOINT_NUMBERS} from "../../layouts/Layout/constants.ts";
import {AtomButtonVariants} from "../../atoms/AtomButton/constants.ts";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AtomButton from "../../atoms/AtomButton";

interface MyPaperProps extends WithStyles<typeof styles> {
    children: React.ReactNode,
    paperClassName?: string,
}

const MyPaper = ({children, paperClassName, classes, ...otherProps}: MyPaperProps) => {
    const {windowWidth} = useWindowSize();
    const isSmall = windowWidth <= BREAKPOINT_NUMBERS.SM;

    return (
        <div className={classNames(classes.container, {[classes.mobileContainer]: isSmall})}>
            <Paper elevation={1}
                   className={classNames(classes.paper, paperClassName, {[classes.mobilePaper]: isSmall})}
                   {...otherProps}>
                <AtomButton
                    buttonVariant={AtomButtonVariants.LINK}
                    text={'Home'}
                    className={classes.backButton}
                    startIcon={<ArrowBackIcon sx={{width: 24, height: 24}}/>}
                />
                {children}
            </Paper>
        </div>
    )
}

export default withStyles(styles)(MyPaper);
