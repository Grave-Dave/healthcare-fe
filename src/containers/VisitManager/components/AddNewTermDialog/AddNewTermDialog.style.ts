import {Theme} from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(({spacing}: Theme) => createStyles({
    dialogContent: {
        display: 'flex',
        flexDirection: 'column',
        width: 800
    },
    selectContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        paddingBottom: spacing(4)
    },
    sliderContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        paddingBottom: spacing(4)
    },
    loaderContainer: {
        display: 'flex',
        alignItems: 'center',
        minHeight: 370
    }
}))
