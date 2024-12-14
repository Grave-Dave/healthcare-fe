import classNames from "classnames";
import Scrollbars from "react-custom-scrollbars-2";

import {Paper} from "@mui/material";

import {useStyles} from "./Login.style.ts";
import AtomButton from "../../atoms/AtomButton";
import {AtomButtonVariants} from "../../atoms/AtomButton/constants.ts";
import useWindowSize from "../../hooks/useWindowSize.ts";
import {BREAKPOINT_NUMBERS} from "../../layouts/Layout/constants.ts";

const Login = () => {
    const {windowWidth} = useWindowSize();
    const classes = useStyles()

    const isSmall = windowWidth <= BREAKPOINT_NUMBERS.SM;

    const actionsContainer = () => {
        return (
            <div className={classes.actionsContainer}>
                <AtomButton buttonVariant={AtomButtonVariants.STANDARD_BUTTON_VARIANT}
                            text={'Zaloguj się'}/>
                <AtomButton buttonVariant={AtomButtonVariants.TEXT}
                            text={'lub zarejestruj się'}/>
            </div>
        )
    }

    return (
        <div className={classNames(classes.loginContainer, {[classes.mobileLoginContainer]: isSmall})}>
            <Paper elevation={1} className={classNames(classes.paperContainer, {[classes.mobilePaperContainer]: isSmall})}>
                <Scrollbars>

                </Scrollbars>
                {actionsContainer()}
            </Paper>
        </div>
    )
}

export default Login
