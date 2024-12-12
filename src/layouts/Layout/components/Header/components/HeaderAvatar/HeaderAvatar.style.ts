import {Theme} from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(({spacing, palette}: Theme) => createStyles({
    headerAvatarContainer: {
        display: "flex",
        alignItems: 'center',
        justifyContent:'flex-end',
        gap: 16,
        padding: spacing(2),
        flex: '1 0 auto'
    },
    headerAvatarText: {
        color: palette.primary.contrastText
    }

}))