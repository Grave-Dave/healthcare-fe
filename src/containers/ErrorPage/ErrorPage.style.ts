import {Theme} from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(({spacing, breakpoints}: Theme) => createStyles({
    paperContainer: {
        position: 'relative',
        width: 1100,
        padding: spacing(3, 2),
        gap: 16,
        justifyContent: 'flex-start',
    },
    mobilePaperContainer: {
        padding: spacing(1, 3, 3, 1),
        flex: 'auto',
        gap: 24,
        [breakpoints.down('xs')]: {
            padding: spacing(1, 1, 2),
        },
    },
    errorContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 32,
        padding: spacing(2),
        height: '75%'
    },
    errorHeader: {
        textTransform: 'uppercase',
    },
    errorText: {
        textTransform: 'uppercase',
        textAlign: 'center'
    },
    image: {
        width: 150,
        height: 150,
        [breakpoints.down('xs')]: {
            width: 80,
            height: 80,
        },
    }
}))
