import {Theme} from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(({spacing}: Theme) => createStyles({
    papersContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    mobilePapersContainer: {
        flexDirection: 'column',
        gap: 16
    },
    paperContainer: {
        position: 'relative',
        width: 700,
        padding: spacing(3, 1),
        gap: 16,
        justifyContent: 'flex-start',
    },
    mobilePaperContainer: {
        padding: spacing(1, 4, 3, 1),
        gap: 32
    },
    header: {
        padding: spacing(1),
        textAlign: 'center',
    },
    headerWithButton: {
        position: 'absolute',
        top: 32,
        left: '50%',
        transform: 'translate(-50%)',
        textAlign: 'center',
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
