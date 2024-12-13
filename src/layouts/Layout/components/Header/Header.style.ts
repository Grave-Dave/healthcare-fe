import {Theme} from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(({palette, spacing}: Theme) => createStyles({
    headerContainer: {
        padding: spacing(1, 3),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 96,
        boxShadow: "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
        backgroundColor: palette.primary.main,
    },
    burgerMenu: {
        color: palette.primary.contrastText,
        cursor: 'pointer',
        '&:hover': {
            color: palette.secondary.light,
        },
    }
}))