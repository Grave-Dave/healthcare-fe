import {Theme} from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';

export const styles = ({spacing}: Theme) => createStyles({
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
        gap: 16
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
})
