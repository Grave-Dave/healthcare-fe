import {useEffect, useState} from "react";
import {Stack} from "@mui/material";

import {useAppDispatch, useAppSelector} from "../../../hooks/reduxHooks.ts";
import selectors from "../../../layouts/Layout/selectors.ts";
import SmoothSnackbar from "../SmoothSnackbar.tsx";
import {actions} from "../../../layouts/Layout/reducer.ts";

const SmoothSnackbarRoot = () => {
    const dispatch = useAppDispatch();

    const snackBarStack = useAppSelector(selectors.getSnackBars)
    const [firstSnackbarId, setFirstNotificationId] = useState(snackBarStack[0]?.id)

    const onSnackbarClose = (id: string) => {
        dispatch(actions.closeSnackBar(id))

        setTimeout(() => {
            dispatch(actions.deleteSnackBar(id))
        }, 300)
    }

    useEffect(() => {
        setFirstNotificationId(snackBarStack[0]?.id)
    }, [snackBarStack])

    const getSnackbars = () => (
        snackBarStack.slice(0, 2).map((snackbar, i) => (
            <SmoothSnackbar
                key={`snackbar-${i}`}
                index={i + 1}
                firstSnackbarId={firstSnackbarId}
                snackbar={snackbar}
                onClose={onSnackbarClose}/>
        ))
    )

    return (
        snackBarStack.length
            ? <Stack spacing={2} sx={{width: '100%'}}>
                {getSnackbars()}
            </Stack>
            : undefined
    )
}

export default SmoothSnackbarRoot
