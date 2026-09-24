import {Theme} from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(({spacing, breakpoints}: Theme) => createStyles({
    paperContainer: {
        width: 600,
        minHeight: 560
    },
    loginHeader: {
        padding: spacing(4, 2, 3),
        textAlign: 'center',
        [breakpoints.down('xs')]: {
            padding: spacing(1, 2),
        },
    },
    actionsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: spacing(2),
        padding: spacing(3),
        [breakpoints.up('sm')]: {
            width: 'fit-content',
            margin: '0 auto'
        },
    },
    mobileActionsContainer: {
        gap: spacing(1),
        padding: spacing(2),
    },
    authContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: spacing(2),
        marginTop: spacing(2)
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
    },
    scrollbar: {
        '& > div': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }
    }
}))
