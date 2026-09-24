import {Theme} from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(({spacing}: Theme) => createStyles({
    item: {
        display:'flex',
        padding: spacing(3, 2),
        justifyContent:'center'
    },
}))