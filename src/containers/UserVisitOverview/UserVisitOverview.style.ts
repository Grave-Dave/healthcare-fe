import {Theme} from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(({spacing}: Theme) => createStyles({
    papersContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'
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
    },
    mobilePaperContainer: {
        padding: spacing(1, 4, 3, 1),
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
    header: {
        padding: spacing(1),
        textAlign: 'center',
    },
    headerWithButton: {
        position: 'absolute',
        top: 32,
        left: '50%',
        transform: 'translate(-50%)'
    },
    shadowedScrollBar: {
        background:
            `linear-gradient(#ffffff 33%, rgba(255,255,255, 0)),
    linear-gradient(rgba(255,255,255, 0), #ffffff 66%) 0 100%,
    radial-gradient(farthest-side at 50% 0, rgba(0,0,0, 0.5), rgba(0,0,0,0)),
    radial-gradient(at bottom, rgba(0,0,0,.25), transparent 80%) 0 calc(100% - 17px)/ 100% 15px`,
        backgroundColor: '#ffffff',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'local, local, scroll, scroll',
        backgroundSize: '100% 45px, 100% 45px, 100% 15px, 100% 15px',
    }
}))