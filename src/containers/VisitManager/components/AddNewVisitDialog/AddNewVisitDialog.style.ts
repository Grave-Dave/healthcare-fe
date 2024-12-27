import {Theme} from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";

export const useStyles = makeStyles(({breakpoints}: Theme) => createStyles({
    loaderContainer: {
        display: 'flex',
        alignItems: 'center',
        minHeight: 125
    },
    contentText: {
        textAlign: 'justify',
        lineHeight: '1.8 !important',
        fontSize: '1rem !important',
        [breakpoints.up('md')]: {
            fontSize: '1.1rem !important',
        },
    }
}))