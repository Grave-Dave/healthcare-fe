import classNames from "classnames";
import Scrollbars from "react-custom-scrollbars-2";

import {Typography} from "@mui/material";
import useWindowSize from "../../hooks/useWindowSize.ts";
import {useStyles} from "./Register.style.ts";
import {BREAKPOINT_NUMBERS} from "../../layouts/Layout/constants.ts";
import MyPaper from "../../reusableComponents/MyPaper";

const Register = () => {
    const {windowWidth} = useWindowSize();
    const classes = useStyles()

    const isSmall = windowWidth <= BREAKPOINT_NUMBERS.SM;

    const inputsContainer = () => {

    }

    const actionsContainer = () => {

    }


    return (
        <MyPaper paperClassName={classNames({[classes.paperContainer]: !isSmall})}>
            <Typography className={classes.registerHeader} variant="h2">Zarejestruj się</Typography>
            <Scrollbars>
                {/*{inputsContainer()}*/}
            </Scrollbars>
            {/*{actionsContainer()}*/}
        </MyPaper>

    )
}

export default Register
