import {Theme} from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme: Theme) => createStyles({
    navItemContainer: {
        display: 'flex',
        alignItems: 'center',
        flex: '1 0 auto',
        cursor: 'pointer',
    },
    divider: {
        width: '100%',
        height: 2,
        backgroundColor: theme.palette.divider
    },
    disabled: {
        cursor: 'default'
    }
}))
