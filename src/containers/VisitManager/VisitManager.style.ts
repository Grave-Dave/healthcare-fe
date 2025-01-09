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
        minHeight: 460
    },
    mobilePaperContainer: {
        padding: spacing(1, 3, 3, 1),
        gap: 24,
        [breakpoints.down('xs')]: {
            padding: spacing(1, 1, 2),
        },
    },
    headerWithButton: {
        position: 'absolute',
        top: 24,
        left: '50%',
        transform: 'translate(-50%)'
    },
    contentContainer: {
        display: 'flex',
        justifyContent:'center',
        width: '100%',
        flex: '1 0 auto',
        gap: 8,
        flexWrap:'wrap',
    },
    paperContent: {
        display:'flex',
        flexDirection:'column',
        gap:16,
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
