import {Theme} from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(({spacing}: Theme) => createStyles({
    paperContainer: {
        width: 600,
        minHeight: 550
    },
    registerHeader: {
        padding: spacing(1.5, 2, 3),
        textAlign: 'center',
    },
    inputsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: spacing(3),
        padding: spacing(2),
    },
    actionsContainer: {
        gap: spacing(2),
        padding: spacing(3),
    },
    mobileActionsContainer: {
        gap: spacing(1),
        padding: spacing(2),
    },
    conditionsBtn: {
        fontSize: '.75rem !important',
        width: '130px !important',
        padding: '0px !important',
    },
}))
