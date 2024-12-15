import {Theme} from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(({spacing}: Theme) => createStyles({
    paperContainer: {
        width: 600,
    },
    loginHeader: {
        padding: spacing(3, 2, 4),
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
}))
