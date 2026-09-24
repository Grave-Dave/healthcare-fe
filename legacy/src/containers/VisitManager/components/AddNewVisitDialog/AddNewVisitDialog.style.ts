import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";

export const useStyles = makeStyles(() => createStyles({
    loaderContainer: {
        display: 'flex',
        alignItems: 'center',
        minHeight: 125
    },
    contentText: {
        textAlign: 'justify',
        lineHeight: '2 !important',
    }
}))
