import {Theme} from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(({spacing}: Theme) => createStyles({
    loginContainer: {
        display: 'flex',
        justifyContent: 'center',
        padding: spacing(3, 2)
    },
    mobileLoginContainer: {
        padding: spacing(0),
    },
    paperContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 600,
        height: 'calc(100vh - 144px)'
    },
    mobilePaperContainer: {
        flex: '1 0 auto',
        width: 'auto',
        height: 'calc(100vh - 96px)',
        alignItems: 'stretch',
    },
    actionsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: spacing(2),
        padding: spacing(3),
    },
    mobileActionsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: spacing(2),
        padding: spacing(3),
    }
}))
