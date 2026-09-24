import {Theme} from "@mui/material/styles";
import createStyles from "@mui/styles/createStyles";

export const styles = (theme: Theme) => createStyles({
    avatar: {
        padding: theme.spacing(.25),
        borderRadius: '50%',
        backgroundColor: theme.palette.background.paper,
        cursor: 'pointer'
    },
    disabled: {
        cursor: 'default'
    },
})
