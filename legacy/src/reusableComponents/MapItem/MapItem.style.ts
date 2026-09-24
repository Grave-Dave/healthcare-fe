import createStyles from '@mui/styles/createStyles';
import {Theme} from "@mui/material/styles";

export const styles = ({palette, spacing, breakpoints}: Theme) => createStyles({
    mapItem: {
        display: 'flex',
        flexDirection: 'column',
    },
    mapDescription: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: spacing(2),
        [breakpoints.down('xs')]: {
            paddingBottom: spacing(1),
        },
    },
    hovered: {
        color: palette.secondary.main
    }
})
