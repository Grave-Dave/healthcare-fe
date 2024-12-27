import {Theme} from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';

export const styles = ({spacing}: Theme) => createStyles({
    calendarContainer: {
        flex: '1 0 350px',
        '@media (min-width:1280px)': {
            flex: '1 0 450px',
        },
    }
})
