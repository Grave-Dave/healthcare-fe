import React, {useEffect} from "react";
import {Alert, Button, Grow, Snackbar, Typography} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";

import theme from "../../layouts/Layout/themeMaterialUi.ts";
import {SmoothSnackbarState} from "../../layouts/Layout/types.ts";

export const useStyles = makeStyles(() => createStyles({
    snackBarText: {
        textTransform: 'uppercase'
    }
}))

interface SmoothSnackbarProps {
    snackbar: SmoothSnackbarState
    index: number
    firstSnackbarId: string
    onClose: (id: string) => void
}

const SmoothSnackbar = ({snackbar, index, firstSnackbarId, onClose}: SmoothSnackbarProps) => {

    const {
        id,
        isSnackBarOpen,
        message,
        autoHideDuration,
        type,
        withButton,
        buttonText,
        onButtonClick
    } = snackbar;

    const classes = useStyles()

    useEffect(() => {
        setTimeout(() => {
            onClose(id)
        }, autoHideDuration)
    }, [])

    const handleClose = (e: React.SyntheticEvent<any> | Event) => {
        const target = e?.target as HTMLElement;

        if (target?.tagName.toLowerCase() !== 'button'
            && target?.tagName.toLowerCase() !== 'path'
            && target?.tagName.toLowerCase() !== 'svg') {
            onClose(firstSnackbarId)
        }
    }

    const handleClick = () => {
        onClose(id)
    }

    const handleButtonClick = () => {
        onButtonClick && onButtonClick()
        onClose(id)
    }

    return (
        <Snackbar
            open={isSnackBarOpen}
            autoHideDuration={autoHideDuration}
            onClose={handleClose}
            TransitionComponent={Grow}
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            sx={{
                '&.MuiSnackbar-root': {bottom: 290 - (index * 70)},
            }}
        >
            <Alert
                onClose={handleClick}
                severity={type}
                sx={{
                    width: '100%',
                    gap: 1,
                    alignItems:'center',
                    '& .MuiAlert-action': {
                        padding: 0,
                    },
                    [theme.breakpoints.down('xs')]: {
                        gap: 0.5
                    },
                }}
                action={withButton ?
                    <Button color="inherit" size="small" onClick={handleButtonClick}>
                        <Typography sx={{color: theme.palette.secondary.main}} variant="body2">{buttonText}</Typography>
                    </Button> : undefined
                }
            >
                <span className={classes.snackBarText}>{message}</span>
            </Alert>
        </Snackbar>
    )
}

export default SmoothSnackbar
