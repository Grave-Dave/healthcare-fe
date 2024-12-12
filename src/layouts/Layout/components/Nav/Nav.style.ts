import {Theme} from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme: Theme) => createStyles({
    navContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        flex: '4 0 auto',
        gap: 24
    },
    navMobileContainer: {
        display: 'flex',
        flexDirection: 'column',
    }
}))
