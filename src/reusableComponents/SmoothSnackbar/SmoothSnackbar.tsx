import {Alert, Slide, Snackbar} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";

import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks.ts";
import selectors from "../../layouts/Layout/selectors.ts";
import {actions} from "../../layouts/Layout/reducer.ts";

export const useStyles = makeStyles(() => createStyles({
    snackBarText: {
        textTransform: 'uppercase'
    }
}))

const SmoothSnackbar = () => {
    const dispatch = useAppDispatch();
    const {isSnackBarOpen, message, autoHideDuration, type} = useAppSelector(selectors.getSnackBar);

    const classes = useStyles()

    const onClose = () => {
        dispatch(actions.closeSnackBar())
    }

    return (
        <Snackbar
            open={isSnackBarOpen}
            autoHideDuration={autoHideDuration}
            onClose={onClose}
            TransitionComponent={Slide}
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            sx={{
                '&.MuiSnackbar-root': {bottom: '200px'},
            }}
        >
            <Alert
                onClose={onClose}
                severity={type}
                sx={{width: '100%'}}
            >
                <span className={classes.snackBarText}>{message}</span>
            </Alert>
        </Snackbar>
    )
}

export default SmoothSnackbar
