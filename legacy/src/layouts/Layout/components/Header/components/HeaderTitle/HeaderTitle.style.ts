import {Theme} from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(({spacing, palette, breakpoints}: Theme) => createStyles({
    headerTitleContainer: {
        flex: '6 0 auto'
    },
    headerText: {
        padding: spacing(.5, 0, .5, 3),
        fontSize: 18,
        fontFamily: "Marck Script !important",
        color: palette.primary.contrastText,
        [breakpoints.down('xs')]: {
            display: 'none',
        },
        [breakpoints.up('sm')]: {
            padding: spacing(.5, 0, .5, 4),
            fontSize: 24,
        },
        [breakpoints.up('md')]: {
            padding: spacing(.5, 0, .5, 5),
            fontSize: 28,
        },
    },
}))