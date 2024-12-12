import {Theme} from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    navLink: {
        padding: theme.spacing(1,2),
        fontSize: 20,
        fontWeight: 400,
        color: theme.palette.primary.contrastText,
        textDecoration: 'none',
        '&:hover': {
            color: theme.palette.secondary.light,
        },
    }
})