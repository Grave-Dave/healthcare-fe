import {Theme} from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(({spacing, breakpoints, palette}: Theme) => createStyles({
    paperContainer: {
        position: 'relative',
        width: 1100,
        padding: spacing(3, 2),
        gap: 16,
        justifyContent: 'flex-start',
    },
    mobilePaperContainer: {
        padding: spacing(1, 3, 3, 1),
        gap: 24,
        [breakpoints.down('xs')]: {
            padding: spacing(1, 1, 2),
        },
    },
    content: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: 24,
        height: '100%',
        width: '100%',
        padding: spacing(0, 2),
        [breakpoints.down('xs')]: {
            padding: spacing(0, 1),
        },
    },
    descriptionWrapper: {
        flex: '1 0 200px',
    },
    descriptionContainer: {
        margin: spacing(0, 2, 2, 0)
    },
    descriptionHeader: {
        textTransform: 'uppercase',
        borderBottom: `2px solid ${palette.secondary.light}`,
    },
    description: {
        paddingTop: spacing(2),
        textAlign: 'justify',
    },
    infoItemWrapper: {
        margin: spacing(0, 2, 2, 0)
    },
    infoItemContainer: {
        display: 'flex',
        gap: 24,
        flexWrap:'wrap',
        padding:spacing(2,1),
        justifyContent:'space-between'
    },
    desktopContainer: {
        position: 'relative',
        maxHeight: 500
    },
    mobileContainer: {
        display: 'flex',
        margin: spacing(2, 0)
    },
    picture: {
        maxWidth: 350,
        maxHeight: 350,
        borderRadius: 8,
        margin: 'auto',
        [breakpoints.down('xs')]: {
            maxWidth: 250,
            maxHeight: 250,
        },
    },
}))