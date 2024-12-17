import React from "react";
import classNames from "classnames";

import {Paper} from "@mui/material";
import {WithStyles, withStyles} from "@mui/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {styles} from "./MyPaper.style.ts";
import useWindowSize from "../../hooks/useWindowSize.ts";
import {BREAKPOINT_NUMBERS} from "../../layouts/Layout/constants.ts";
import {AtomButtonVariants} from "../../atoms/AtomButton/constants.ts";
import AtomButton from "../../atoms/AtomButton";

interface MyPaperProps extends WithStyles<typeof styles> {
    children: React.ReactNode,
    paperClassName?: string,
    withBackButton?: boolean,
}

const MyPaper = ({children, paperClassName, withBackButton = false, classes, ...otherProps}: MyPaperProps) => {
    const {windowWidth} = useWindowSize();
    const isSmall = windowWidth <= BREAKPOINT_NUMBERS.SM;

    return (
        <div className={classNames(classes.container, {[classes.mobileContainer]: isSmall})}>
            <Paper elevation={3} className={classNames(classes.paper, paperClassName, {[classes.mobilePaper]: isSmall})}
                   {...otherProps}>
                {withBackButton && <AtomButton
                    buttonVariant={AtomButtonVariants.LINK}
                    className={classes.backButton}
                >
                    <span className={classes.backButtonText}>
                        <ArrowBackIcon sx={{width: 24, height: 24}}/>
                        Home
                    </span>
                </AtomButton>}
                {children}
            </Paper>
        </div>
    )
}

export default withStyles(styles)(MyPaper);
