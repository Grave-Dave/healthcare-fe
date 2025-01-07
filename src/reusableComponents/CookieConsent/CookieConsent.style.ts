import {Theme} from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(({breakpoints}: Theme) => createStyles({
    cookieText: {
        textAlign: 'justify'
    },
    titleContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 16
    },
    cookie: {
        width: 50,
        height: 50,
        [breakpoints.down('xs')]: {
            width: 40,
            height: 40,
        },
    }
}))
