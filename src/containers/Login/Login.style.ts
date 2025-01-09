import {Theme} from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(({spacing}: Theme) => createStyles({
    paperContainer: {
        width: 600,
        minHeight: 560
    },
    loginHeader: {
        padding: spacing(4, 2, 3),
        textAlign: 'center',
    },
    actionsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: spacing(2),
        padding: spacing(3),
    },
    mobileActionsContainer: {
        gap: spacing(1),
        padding: spacing(2),
    },
    inputsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: spacing(4),
        padding: spacing(2),
    },
    passwordContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    forgotPasswordBtn: {
        alignSelf: 'flex-end',
        fontSize: '12px !important',
        '& a': {
            paddingRight: '0px !important'
        }
    }
}))
