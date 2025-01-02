import {Theme} from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(({spacing, breakpoints}: Theme) => createStyles({
    papersContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    mobilePapersContainer: {
        gap: 16
    },
    paperContainer: {
        position: 'relative',
        maxWidth: 1100,
        padding: spacing(3, 2),
        gap: 24,
        flex: '1 0 auto',
        justifyContent: 'flex-start',
    },
    mobilePaperContainer: {
        padding: spacing(1, 3, 3, 1),
        gap: 32,
        [breakpoints.down('xs')]: {
            padding: spacing(1, 1, 2),
        },
    },
    contentContainer: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        flex: '1 0 auto',
        gap: 8,
        flexWrap: 'wrap',
    },
    header: {
        padding: spacing(1),
        textAlign: 'center',
    },
    headerWithButton: {
        position: 'absolute',
        top: 24,
        left: '50%',
        transform: 'translate(-50%)',
        textAlign: 'center',
    },
    paperContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
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
