import {Theme} from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(({spacing}: Theme) => createStyles({
    paperContainer: {
        width: 600
    },
    registerHeader:{
        padding: spacing(3, 2, 4),
        textAlign: 'center',
    },
}))