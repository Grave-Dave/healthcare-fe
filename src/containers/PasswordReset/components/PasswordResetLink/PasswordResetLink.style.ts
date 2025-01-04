import {Theme} from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(({spacing}: Theme) => createStyles({
    paperContainer: {
        width: 600,
    },
    resetHeader: {
        padding: spacing(4, 2, 3),
        textAlign: 'center',
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: spacing(4),
        padding: spacing(2),
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: spacing(2),
        padding: spacing(3,3,8),
    },
    mobileButtonContainer: {
        gap: spacing(1),
        padding: spacing(2,2,4),
    },
}))