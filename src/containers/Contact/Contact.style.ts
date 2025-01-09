import {Theme} from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import theme from "../../layouts/Layout/themeMaterialUi.ts";

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
    contactWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        width:'100%',
        minHeight: 460
    },
    descriptionContainer: {
        margin: spacing(1),
        height: '100%'
    },
    descriptionHeader: {
        textTransform: 'uppercase',
        borderBottom: `2px solid ${palette.secondary.light}`,
    },
    description: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: spacing(3),
        textAlign: 'justify',
    },
    phone: {
        display: 'flex',
        alignItems: 'center',
        '&:hover': {
            color: `${theme.palette.secondary.light} !important`
        }
    },
    footer: {
        width: '100%'
    }
}))
