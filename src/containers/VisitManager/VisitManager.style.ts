import {Theme} from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(({spacing}: Theme) => createStyles({
    paperContainer: {
        position: 'relative',
        width: 1100,
        padding: spacing(3, 2),
        gap: 16,
        justifyContent: 'flex-start',
    },
    mobilePaperContainer: {
        padding: spacing(1, 4, 3, 1),
        gap: 24
    },
    headerWithButton: {
        position: 'absolute',
        top: 32,
        left: '50%',
        transform: 'translate(-50%)'
    },
    contentContainer: {
        display: 'flex',
        width: '100%',
        flex: '1 0 auto',
        gap: 24
    },
    paperContent: {
        padding: spacing(3, 2, 3),
    },
    emptyContent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '80%',
    },
}))
