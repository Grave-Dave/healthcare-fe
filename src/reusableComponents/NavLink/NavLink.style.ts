import {Theme} from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    navLink: {
        padding: theme.spacing(1, 2),
        fontSize: 16,
        fontWeight: 400,
        color: theme.palette.primary.contrastText,
        textDecoration: 'none',
        height: '100%',
        [theme.breakpoints.up('lg')]: {
            fontSize: 18,
        },
    },
    mobileLink: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 24,
        color: theme.palette.secondary.contrastText,
        padding: theme.spacing(0, 2),
    },
    hovered: {
        color: `${theme.palette.secondary.light} !important`,
    }
})