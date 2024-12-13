import {Theme} from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(({spacing, palette, breakpoints}: Theme) => createStyles({
    headerAvatarContainer: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 16,
        padding: spacing(1, 0),
        flex: '1 0 auto',
        [breakpoints.up('md')]: {
            padding: spacing(1, 1, 1, 2),
        },
    },
    headerAvatarText: {
        color: palette.primary.contrastText,
    },
    arrow: {
        color: palette.primary.contrastText,
        cursor: 'pointer',
        zIndex: 100,
        '&:hover': {
            color: palette.secondary.light,
        },
    },
    arrowRotated: {
        transform: 'rotate(180deg)'
    }
}))