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
        flex: 'auto',
        [breakpoints.down('xs')]: {
            padding: spacing(1, 1, 2),
        },
    },
    commuteWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        width: '100%',
    },
    descriptionContainer: {
        margin: spacing(1),
    },
    descriptionHeader: {
        textTransform: 'uppercase',
        borderBottom: `2px solid ${palette.secondary.light}`,
    },
    description: {
        display: 'flex',
        justifyContent: 'center',
        padding: spacing(3, 0, 1),
        textAlign: 'justify',
    },
    mapWrapper: {
        flex: '1 0 200px',
    },
    mapContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 24,
        padding: spacing(2),
        justifyContent: 'center',
        alignItems: 'center',
        height: '85%'
    },
    mapItem: {
        display: 'flex',
        flexDirection: 'column',
    },
    mapDescription: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: spacing(3),
        [breakpoints.down('xs')]: {
            paddingBottom: spacing(1),
        },
    },
    footer: {
        paddingTop: spacing(2),
        width: '100%'
    }
}))
