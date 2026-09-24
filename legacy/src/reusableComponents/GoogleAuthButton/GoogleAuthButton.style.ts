import {Theme} from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';

export const styles = ({spacing, palette}: Theme) => createStyles({
    container: {
        display: 'flex',
        justifyContent: 'center',
        padding: spacing(2)
    },
    button: {
        gap: spacing(2),
        backgroundColor: palette.primary.main
    }
})
