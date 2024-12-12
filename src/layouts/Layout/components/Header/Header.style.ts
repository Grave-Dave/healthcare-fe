import {Theme} from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(({palette, spacing}: Theme) => createStyles({
    container: {
        padding: spacing(1, 4),
        backgroundColor: palette.primary.main,
        boxShadow: "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between'
    },
    text: {}
}))