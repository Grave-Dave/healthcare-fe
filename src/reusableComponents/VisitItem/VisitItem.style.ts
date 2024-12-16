import {Theme} from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';

export const styles = ({palette, spacing}: Theme) => createStyles({
    visitItemContainer: {
        display: 'flex',
        gap: 24,
        justifyContent: 'center',
        padding: spacing(3, 0)
    },
    divider: {
        width: '100%',
        height: 2,
        backgroundColor: palette.divider
    }
})
