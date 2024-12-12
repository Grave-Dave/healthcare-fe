import {Theme} from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(({spacing, palette}: Theme) => createStyles({
    headerTitleContainer: {
        flex: '3 0 auto'
    },
    headerText: {
        padding: spacing(1, 0, 1, 5),
        fontSize: 28,
        fontFamily: "Marck Script !important",
        color: palette.primary.contrastText,
    },
}))